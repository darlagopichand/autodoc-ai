const Guide = require("../models/Guide");

// @desc    Create a new Guide
// @route   POST /api/guides
exports.createGuide = async (req, res) => {
  try {
    const guide = await Guide.create(req.body);
    
    res.status(201).json({
      success: true,
      data: guide
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all Guides
// @route   GET /api/guides
exports.getGuides = async (req, res) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 }); // Newest first

    res.status(200).json({
      success: true,
      count: guides.length,
      data: guides
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error"
    });
  }
};
// @desc    Get a single Guide
// @route   GET /api/guides/:id
exports.getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ success: false, error: "Guide not found" });
    }
    res.status(200).json({ success: true, data: guide });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};