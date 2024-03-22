const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function for authenticating JWT tokens
const authMiddleware = (req, res, next) => {
  // Extract the token from the request header
  const token = req.header('Authorization');

  // If no token is provided, return an error response
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID to the request object
    req.userId = decoded.id;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid, return an error response
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
