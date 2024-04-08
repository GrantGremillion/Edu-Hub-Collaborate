const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/downloadFile/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(process.env.UPLOAD_FILE_PATH_CHAT_FILES , filename); 

    console.log(filePath);
    const data = fs.readFileSync(filePath, 'utf-8');
    //console.log(`the data is ${data}`);
    
    //res.setHeader('Content-Disposition', 'attachment; filename="teacher1.png"');
    res.download(filePath, filename, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error downloading file' });
        }
    });
});

module.exports = router;
