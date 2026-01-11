const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get header safely
    const authHeader = req.headers.authorization;

    // Check header format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token not found' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.error('JWT ERROR:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
