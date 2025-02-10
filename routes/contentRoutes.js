const express = require("express");
const router = express.Router();
const {
  getAllContent,
  getContent,
  createContent,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

router.get("/", getAllContent); // Get all content
router.get("/:section", getContent); // Get specific section
router.post("/", createContent); // Create new content
router.put("/", updateContent); // Update existing content
router.delete("/:section", deleteContent); // Delete single or all content

module.exports = router;
