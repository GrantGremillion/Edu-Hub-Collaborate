const express = require('express');
const router = express.Router();

const multer = require('multer')
const upload = multer({ dest: process.env.UPLOAD_FILE_PATH })

const db = require('../database.cjs')


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

    return res.json({ Status: "Success", messages: data});
    });
    
});


module.exports = router;