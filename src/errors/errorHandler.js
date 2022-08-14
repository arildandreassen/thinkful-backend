const errorHandler = (error, req, res, next) => {
  const { status, message } = error;
  res.status(status).json({ error: message });
};

module.exports = errorHandler;
