require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  const token2 = req.localStorage.getItem("access_token");
  const id = req.localStorage.getItem("user");

  if (!token) return res.sendStatus(401);
  if (!token2) return res.sendStatus(401);

  const verifyID = jwt.decode(token2, process.env.JWT_SECRET);
  console.log(verifyID);
  if (verifyID.id !== id) {
    return res.sendStatus(401);
  }
  next()
};

module.exports = authenticateToken;
