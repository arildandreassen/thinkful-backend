const service = require("./theaters.service");

const list = async (req, res, next) => {
  const data = await service.list();
  res.json({ data });
};

module.exports = {
  list,
};
