const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

const generateUserToken = user => {
  const payload = {
    _id: user._id,
    name: user.name,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  return jwt.sign(payload, secret);
};

const validateToken = token => {
  return jwt.verify(token, secret);
};

module.exports = { generateUserToken, validateToken };
