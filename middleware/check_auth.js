const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("succefull check auth");
  try {
    const decoded = jwt.decode(req.body.token, `process.env.JWT_KEY`);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth faild",
    });
  }
};
