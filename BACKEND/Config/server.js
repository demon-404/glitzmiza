const mongoose = require("mongoose");

const connect = () => {
  const uri = process.env.MONGODB_URI || process.env.mongourl;
  if (!uri) {
    console.error("❌ Missing MongoDB connection string (MONGODB_URI or mongourl)");
    process.exit(1);
  }

  return mongoose
    .connect(uri)
    .then(() => console.log("✅ Database Connected Successfully"))
    .catch((err) => console.error("❌ Database Connection Error:", err));
};

module.exports = connect;
