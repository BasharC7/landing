const mongoose = require("mongoose");
const Content = require("../models/Content");
const { AppError } = require("../utils/errorHandler");
const catchAsync = require("../utils/catchAsync");

// Get all content
exports.getAllContent = catchAsync(async (req, res, next) => {
  const content = await Content.find().lean();
  res.status(200).json({ status: "success", result: content.length, data: { content } });
});

// Get content by ID
exports.getContent = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid ID format", 400));
  }

  const content = await Content.findById(req.params.id).lean();
  if (!content) return next(new AppError("Content not found", 404));

  res.status(200).json({ status: "success", result: 1, data: { content } });
});

// Create new content
exports.createContent = catchAsync(async (req, res, next) => {
  const { section, data, image } = req.body;

  // Check if content with the same section already exists
  const existingContent = await Content.findOne({ section }).lean();
  if (existingContent) return next(new AppError("Content already exists. Use update instead.", 400));

  const content = await Content.create({ section, data, image });

  res.status(201).json({ status: "success", result: 1, data: { content } });
});

// Update content by ID
exports.updateContent = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid ID format", 400));
  }

  const { section, data, image } = req.body;
  if (!section && !data && !image) {
    return next(new AppError("At least one field (section, data, image) must be provided", 400));
  }

  const updatedFields = {};
  if (section) updatedFields.section = section;
  if (data) updatedFields.data = data;
  if (image) updatedFields.image = image;

  const content = await Content.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true, lean: true });

  if (!content) return next(new AppError("Content not found or invalid ID.", 404));

  res.status(200).json({ status: "success", result: 1, data: { content } });
});

// Delete content by ID or delete all
exports.deleteContent = catchAsync(async (req, res, next) => {
  if (req.params.id === "all") {
    await Content.deleteMany({});
    return res.status(204).json({ status: "success", message: "All content deleted successfully" });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new AppError("Invalid ID format", 400));
  }

  const content = await Content.findByIdAndDelete(req.params.id);
  if (!content) return next(new AppError("Content not found", 404));

  res.status(200).json({ status: "success", message: "Content deleted successfully" });
});
