const mongoose = require("mongoose");

const connect = () => {
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Database Connected Successfully"))
    .catch((err) => console.error("❌ Database Connection Error:", err));
};

module.exports = connect;
