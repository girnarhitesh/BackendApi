const products = require("../models/Product");

const getAllProducts = async (req, res) => {
  const myData = await products.find({});
  res.status(200).json({ myData });
};

const getAllProductsTesting = async (req, res) => {
  const myData = await products.find(req.query).select("name");
  res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };