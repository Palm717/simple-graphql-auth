const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `MongoDB Connected: ${connection.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
