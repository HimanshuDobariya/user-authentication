const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connection Successful!");
  } catch (err) {
    console.log("Connection Fail!", err);
    process.exit(1);
  }
};

module.exports = connectToDB;
