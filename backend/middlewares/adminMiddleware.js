exports.adminMiddleware = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
