const express = require('express');
const router = express.Router();


const db = require('../database.cjs')

const path = require('path');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOAD_FILE_PATH_CHAT_FILES) 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) 
    }
});

const upload = multer({ storage: storage, dest: process.env.UPLOAD_FILE_PATH_CHAT_FILES })


router.post('/send', upload.single("file"), (req,res) => {

    const account = req.body.account;

    let file;

    if (!req.file){
       file = null;
    }
    else{
        file = req.file.filename;
    }
    

    if (account === 'student'){
        const sendStudentMessageSql = "INSERT INTO Messages (Cid,Sid,content,Imgid) VALUES (?,?,?,?)";
    
        db.query(sendStudentMessageSql, [req.body.Cid,req.body.id,req.body.text,file], (err) => {
  
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    
        return res.json({ Status: "Success"});
        });
    }

    else if (account === 'teacher'){
        const sendTeacherMessageSql = "INSERT INTO Messages (Cid,Tid,content,Imgid) VALUES (?,?,?,?)";
    
        db.query(sendTeacherMessageSql, [req.body.Cid,req.body.id,req.body.text,file], (err) => {
   
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    
        return res.json({ Status: "Success"});
        });
    }
 
});

router.post('/get_all', (req,res) => {

   
    const getMessagesSql = "SELECT * FROM Messages WHERE Cid = ?";

    db.query(getMessagesSql, [req.body.Cid], (err,data) => {

    if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }


    // Looking through all messages to find which ones contain file uploads
    const messagesWithFiles = data.map(message => {
        const messageWithFile = { ...message };
        const filename = message.Imgid;
        // If a the message has a file attatched
        if (filename) {
            const filePath = path.join(__dirname, process.env.UPLOAD_FILE_PATH_CHAT_FILES , filename);
            const fileUrl = `/download/downloadFile/${filename}`; 
            messageWithFile.fileUrl = fileUrl; 
        }
        return messageWithFile;
    });

    return res.json({ Status: "Success", messages: messagesWithFiles });
    });

    
});


module.exports = router;