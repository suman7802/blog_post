const mongoose = require("mongoose");

async function connectDB() {
  try {
    const connectionName = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Connect to DB successfully! ${connectionName.connection.host}`
    );
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = connectDB;
