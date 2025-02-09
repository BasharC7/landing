const Content = require("../models/Content");

// Get content by section
exports.getContent = async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update or Create content
exports.updateContent = async (req, res) => {
  try {
    const { section, data } = req.body;
    let content = await Content.findOneAndUpdate(
      { section },
      { data },
      { new: true, upsert: true }
    );
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
