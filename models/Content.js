const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true }, // e.g., "hero", "about", "contact"
  data: { type: String, required: true }, // Store text, images, etc.
  image: { type: String, default: null } // <-- Nullable image field
});

module.exports = mongoose.model("Content", contentSchema);