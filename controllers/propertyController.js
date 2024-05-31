const Property = require("../models/properties");
const getAllProperties = async (req, res) => {
  const properties = await Property.find();
  res.status(200);
  res.json(properties);
};
module.exports = {
  getAllProperties,
};
