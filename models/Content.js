const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, // e.g., "hero", "about", "contact"
  data: { type: Object, required: true }, // Store text, images, etc.
});

module.exports = mongoose.model("Content", contentSchema);