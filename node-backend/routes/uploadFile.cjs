
// multer library allows us to store images on our local machine
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_FILE_PATH_TEACHER_IMAGES)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage, dest: process.env.UPLOAD_FILE_PATH_TEACHER_IMAGES })

const express = require('express');
const router = express.Router();
const db = require('../database.cjs')

////// Upload File API //////

router.post('/uploadFile', upload.single("image"), (req, res) => {

  const imageName = req.file.filename;
  console.log(imageName);

  res.send({ imageName });
})

module.exports = router;