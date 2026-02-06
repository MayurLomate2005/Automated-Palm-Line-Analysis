const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("palm"), (req, res) => {
  res.json({
    message: "Palm image uploaded successfully",
    image: req.file.filename
  });
});

module.exports = router;
