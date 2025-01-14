// models/News.js
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // New field to store image path
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);
