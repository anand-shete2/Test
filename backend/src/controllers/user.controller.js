const crypto = require("crypto");
const User = require("../models/user.model");
const { putObjectForProfile } = require("../config/aws");
const { generateUserToken, validateToken } = require("../services/auth");
const { getGoogleOAuthClient, setJWT } = require("../utils/index.utils");

const checkAuth = async (req, res) => {
  const { email } = req.body;

  const user = await User.countDocuments({ email }).lean();
  if (user) return res.status(200).json(true);

  return res.status(200).json(false);
};

const generateSignedUrl = async (req, res) => {
  try {
    const fileType = req.body.type;
    if (!fileType) {
      return res.status(401).json({ message: "Invalid File Type" });
    }
    const url = await putObjectForProfile(fileType);
    if (!url) return res.status(500).json({ message: "Error generating Signed URL" });
    return res.status(201).json({ message: "Generated Pre-signed URL", url });
  } catch (error) {
    return res.status(500).json({ message: "Error generating Signed URL" });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password, profileImageURL } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are requried" });
    }

    const check = await User.countDocuments({ email }).lean();
    if (check) {
      return res.status(409).json({ message: "Account already exists" });
    }

    await User.create({ name, email, password, profileImageURL });
    return res.status(201).json({ message: "Account created succcessfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating Account" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).status({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Account not found" });

    if (user.authProvider === "google") {
      return res.status(403).json({
        message: "We found a Google account linked to this email. Please use Google sign-in.",
      });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const token = generateUserToken(user);
    if (!token) {
      return res.status(400).json({ message: "Error generating Token" });
    }
    await setJWT(res, token);

    return res.status(200).json({ message: "Login success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login error" });
  }
};

const logout = (req, res) => {
  return res.status(200).clearCookie("token").json({ message: "Logged out successfully" });
};

const authStatus = async (req, res) => {
  try {
    const token = req.cookies?.["token"];
    if (!token) return res.status(401).json({ message: "Login First" });

    const user = validateToken(token);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Authenticating User" });
  }
};

const googleOAuth = (req, res) => {
  try {
    const oauthclient = getGoogleOAuthClient();
    const state = crypto.randomBytes(32).toString("hex");

    req.session.state = state;
    const authorizedUrl = oauthclient.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid",
      ],
      state,
      prompt: "consent",
      response_type: "code",
    });
    return res.redirect(authorizedUrl);
  } catch (error) {
    console.log("Error generating google authorization url", error);
    return res.status(500).json({ message: "Error generating Google Auth URL" });
  }
};

const googleOAuthCallback = async (req, res) => {
  try {
    const code = req.query?.code;
    if (req.query?.error || req.query?.state != req.session.state) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?OAuthError`);
    }

    const oauthclient = getGoogleOAuthClient();

    const { tokens } = await oauthclient.getToken(code);
    const { id_token } = tokens;

    const ticket = await oauthclient.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const userInfo = ticket.getPayload();
    const { name, email, picture } = userInfo;

    // check if user exists in database and create if doesn't
    let user;
    user = await User.findOne({ name, email, authProvider: "google" }).lean();
    if (!user) {
      user = await User.create({
        name,
        email,
        profileImageURL: picture,
        role: "user",
        authProvider: "google",
      });
    }

    const token = generateUserToken(user);
    if (!token) {
      return res.status(500).json({ message: "Error generaing token" });
    }

    await setJWT(res, token);
    return res.status(302).redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.log("error redirecting in google oauth flow", error);
    return res.redirect(`${process.env.FRONTEND_URL}/login?OAuthError`);
  }
};

module.exports = {
  checkAuth,
  generateSignedUrl,
  signup,
  signin,
  logout,
  authStatus,
  googleOAuth,
  googleOAuthCallback,
};
