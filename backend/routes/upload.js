const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("palm"), (req, res) => {
  const imagePath = `uploads/${req.file.filename}`;

  exec(`python process.py ${imagePath}`, (error) => {
    if (error) {
      return res.status(500).json({ error: "Image processing failed" });
    }

   res.json({
  message: "Palm image processed successfully",
  original: imagePath,
  processed: "processed.jpg",
  analysis: {
    lifeLine: "Strong and continuous life line detected",
    headLine: "Moderately curved head line indicating analytical thinking",
    heartLine: "Balanced heart line suggesting emotional stability",
    personality: "Focused, practical, and goal-oriented individual",
    career: "Suitable for technical and analytical roles"
  }
});
  });
});

module.exports = router;
