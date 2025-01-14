const express = require("express");
const multer = require("multer");
const path = require("path");
const News = require("../models/News");
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filenames
  },
});

// File filter for multer
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject non-image files
  }
};

const upload = multer({ storage, fileFilter });

// Serve the 'uploads' folder statically
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Get all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news" });
  }
});

// Add news with an image
router.post("/", upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? `/api/news/uploads/${req.file.filename}` : null;

  try {
    const news = new News({ title, content, image: imageUrl });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: "Error adding news" });
  }
});

module.exports = router;
