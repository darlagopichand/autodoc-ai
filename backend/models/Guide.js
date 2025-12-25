const mongoose = require("mongoose");

const GuideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
  },
  description: {
    type: String, // AI will generate this later
  },
  steps: [
    {
      order: Number,
      element: String, // e.g., "BUTTON.login-btn"
      action: String,  // e.g., "CLICK" or "TYPE"
      content: String, // e.g., "User clicked Login"
      imageUrl: String // We will store the screenshot here
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Guide", GuideSchema);