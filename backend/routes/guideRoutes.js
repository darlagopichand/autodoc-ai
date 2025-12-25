const express = require("express");
const router = express.Router();

// ✅ IMPORT ALL 3 FUNCTIONS HERE
const { 
  createGuide, 
  getGuides, 
  getGuideById // <--- This was missing before!
} = require("../controllers/guideController");

router.route("/").post(createGuide).get(getGuides);
router.route("/:id").get(getGuideById);

module.exports = router;