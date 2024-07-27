const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../utilities/uploadHandler');
const router = express.Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to base64 string
    const fileStr = req.file.buffer.toString('base64');

    // Upload image to Cloudinary
    const result = await uploadImage(`data:image/jpeg;base64,${fileStr}`);

    res.status(200).json({
      message: 'Image uploaded successfully',
      url: result.secure_url
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image', error });
  }
});

module.exports = router;
