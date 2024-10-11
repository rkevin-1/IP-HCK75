const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.header('Authorization'); 
// console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    let [, tokenWithoutBearer] = token.split(' ');
    // console.log(tokenWithoutBearer);
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
// console.log(decoded);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { auth };
