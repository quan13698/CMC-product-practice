const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authenHeader = req.header("Authorization");
  const token = authenHeader && authenHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};
module.exports = verifyToken;
