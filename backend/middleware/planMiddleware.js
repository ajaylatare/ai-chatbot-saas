const planMiddleware = (req, res, next) => {

  // User ka plan check karo
  if (req.user.plan !== 'paid') {
    return res.status(403).json({
      success: false,
      message: 'This feature requires a paid plan.'
    });
  }

  next();
};

module.exports = planMiddleware;