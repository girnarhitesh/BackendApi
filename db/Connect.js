// db/Connect.js
const mongoose = require("mongoose");

const ConnectDB = async (MONGODB_URL) => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    // console.error("❌ MongoDB connection failed:", error.message);
    // throw error;
  }
};

module.exports = ConnectDB;