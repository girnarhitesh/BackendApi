const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS middleware import karein
require('dotenv').config();

const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS middleware ka use karein
app.use(cors());

// Database se connect karein
const connectDB = async () => {
  try {
    console.log("MONGO_URI value:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
};

app.get('/api/v1/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// productstesting के लिए नया route (filters, sorting, selecting और pagination के साथ)
app.get('/api/v1/productstesting', async (req, res) => {
  try {
    const { name, company, featured, sort, select } = req.query;
    const queryObject = {};
    let sortList = '';
    let selectList = '';

    if (company) {
      queryObject.company = company;
    }

    if (name) {
      queryObject.name = { $regex: name, $options: 'i' };
    }

    if (featured) {
      queryObject.featured = featured === 'true' ? true : false;
    }

    if (sort) {
      sortList = sort.split(',').join(' ');
    } else {
      sortList = 'createdAt'; // Default sorting
    }

    if (select) {
      selectList = select.split(',').join(' ');
    }

    let apiData = Product.find(queryObject);
    apiData = apiData.sort(sortList);

    if (selectList) {
      apiData = apiData.select(selectList);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;
    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    const products = await apiData;
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port ${PORT}...`);
  });
};

startServer();
