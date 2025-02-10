const Content = require("../models/Content");

// Get all content
exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.find().select('-__v');
    res.status(200).json({
      status: "success",
      result: content.length,
      data: { content },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Get content by section
exports.getContent = async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section }).select('-__v');

    if (!content) {
      return res.status(404).json({
        status: "error",
        message: "Content not found",
      });
    }

    res.status(200).json({
      status: "success",
      result: 1,
      data: { content },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Create new content
exports.createContent = async (req, res) => {
  try {
    const { section, data,image } = req.body;

    // Check if section already exists
    const existingContent = await Content.findOne({ section });
    if (existingContent) {
      return res.status(400).json({
        status: "error",
        message: "Content for this section already exists. Use update instead.",
      });
    }

    const content = await Content.create({ section, data , image});

    res.status(201).json({
      status: "success",
      result: 1,
      data: { content },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Update existing content
exports.updateContent = async (req, res) => {
  try {
    const { section, data } = req.body;

    const content = await Content.findOneAndUpdate(
      { section },
      { data },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({
        status: "error",
        message: "Content not found. Use create instead.",
      });
    }

    res.status(200).json({
      status: "success",
      result: 1,
      data: { content },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete content (single section or all)
exports.deleteContent = async (req, res) => {
  try {
    const { section } = req.params;

    if (section === "all") {
      await Content.deleteMany({});
      return res.status(200).json({
        status: "success",
        result: 0,
        message: "All content deleted successfully",
      });
    }

    const content = await Content.findOneAndDelete({ section });

    if (!content) {
      return res.status(404).json({
        status: "error",
        message: "Content not found",
      });
    }

    res.status(200).json({
      status: "success",
      result: 1,
      message: "Content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
