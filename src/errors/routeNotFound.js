const routeNotFound = (req, res, next) => {
  next({ status: 404, message: "route not found" });
};

module.exports = routeNotFound;
