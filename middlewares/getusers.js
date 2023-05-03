const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "User Unauthorized" });
    }
    const isAuthorized = jwt.verify(token, process.env.SECRET_KEY);
    req.user = isAuthorized;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "User Unauthorized" });
  }
};
