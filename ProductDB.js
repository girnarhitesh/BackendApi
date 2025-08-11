// required packages ko import karein
const mongoose = require('mongoose');
require('dotenv').config();

// models/Product.js se Product model ko import karein
const Product = require('./models/Product');

const productsData = [
  {
    "name": "iphone",
    "price": 154,
    "featured": true,
    "company": "apple"
  },
  {
    "name": "iphone10",
    "price": 15400,
    "featured": true,
    "company": "apple"
  },
  {
    "name": "iphone12",
    "price": 122000,
    "featured": false,
    "company": "apple"
  },
  {
    "name": "iphone13",
    "price": 154,
    "featured": false,
    "company": "apple"
  },
  {
    "name": "iphone6",
    "price": 154,
    "featured": true,
    "company": "apple"
  },
  {
    "name": "oppo",
    "price": 154,
    "featured": false,
    "company": "samsung"
  },
  {
    "name": "vivo",
    "price": 154,
    "featured": true,
    "company": "mi"
  },
  {
    "name": "Sumsung",
    "price": 154,
    "featured": false,
    "company": "samsung"
  },
  {
    "name": "MacBook Air",
    "price": 99900,
    "featured": true,
    "company": "apple"
  },
  {
    "name": "Dell XPS 13",
    "price": 120000,
    "featured": true,
    "company": "dell"
  },
  {
    "name": "Samsung Galaxy S22",
    "price": 75000,
    "featured": true,
    "company": "samsung"
  },
  {
    "name": "Mi Laptop Pro",
    "price": 65000,
    "featured": false,
    "company": "mi"
  },
  {
    "name": "iMac",
    "price": 150000,
    "featured": false,
    "company": "apple"
  },
  {
    "name": "Dell Inspiron",
    "price": 55000,
    "featured": false,
    "company": "dell"
  }
];

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected...");

    // Existing products ko delete karein taaki duplicate na ho
    await Product.deleteMany({});
    console.log("Existing products deleted!");

    // Ek hi baar mein saare products add karein
    await Product.insertMany(productsData);
    console.log("✅ All products added successfully!");

  } catch (err) {
    console.error("❌ Database operation failed:", err);
    process.exit(1);
  }
}

start();