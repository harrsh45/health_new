require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected successfully"))
  .catch((err) => console.error("❌ Error:", err.message));
