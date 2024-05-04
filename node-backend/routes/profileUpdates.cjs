const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database.cjs');
const router = express.Router();

// Setup storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

router.post('/edit-profile', upload.single('profilePicture'), async (req, res) => {
  const { displayName, bio, email } = req.body;
  const profilePicturePath = req.file ? `/uploads/${req.file.filename}` : null; // Adjust path as necessary

  // Try updating both student and teacher tables
  const queries = [
    `UPDATE Slogin SET name = ?, bio = ?, profilePicture = ? WHERE email = ?`,
    `UPDATE Tlogin SET name = ?, bio = ?, profilePicture = ? WHERE email = ?`
  ];

  try {
    const promises = queries.map(query =>
      db.promise().query(query, [displayName, bio, profilePicturePath, email])
    );

    const results = await Promise.allSettled(promises);
    const updated = results.filter(result => result.status === 'fulfilled' && result.value[0].affectedRows > 0);

    if (updated.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
