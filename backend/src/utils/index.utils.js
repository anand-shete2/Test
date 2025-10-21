const { google } = require("googleapis");

const getGoogleOAuthClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
};

const setJWT = async (res, token) => {
  if (process.env.NODE_ENV === "production") {
    res.cookie("token", token, prodCookieOpts);
  } else {
    res.cookie("token", token, devCookieOpts);
  }
};

const prodCookieOpts = {
  domain: process.env.COOKIE_DOMAIN,
  httpOnly: true,
  maxAge: 1000 * 60 * 15,
  sameSite: "none",
  secure: process.env.NODE_ENV === "production",
};

const devCookieOpts = {
  httpOnly: true,
  maxAge: 1000 * 60 * 15,
};

module.exports = { getGoogleOAuthClient, setJWT, prodCookieOpts, devCookieOpts };
