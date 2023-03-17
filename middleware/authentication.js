const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check for token in headers
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "process.env.JWT_SECRET");
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;