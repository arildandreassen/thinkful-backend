const methodNotAllowed = (req, res, next) => {
  const { method, baseUrl, route } = req;
  next({
    status: 405,
    message: `The method ${method} is not allowed on path ${
      baseUrl + route.path
    }`,
  });
};

module.exports = methodNotAllowed;
