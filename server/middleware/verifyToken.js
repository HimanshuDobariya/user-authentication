const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(400).json({
      message: "Not Authorised.",
    });
  }
  
  //decode token to take user info
  try {
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeTokenInfo)
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised." });

    req.userId = decodeTokenInfo.userId;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = verifyToken;
