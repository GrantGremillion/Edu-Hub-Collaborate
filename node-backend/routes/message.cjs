const express = require('express');
const router = express.Router();

const db = require('../database.cjs')



router.post('/send', (req,res) => {

    const account = req.body.account;
    console.log(req.body.Cid);


    if (account === 'student'){
        const sendStudentMessageSql = "INSERT INTO Messages (Cid,Sid,content) VALUES (?,?,?)";
    
        db.query(sendStudentMessageSql, [req.body.Cid,req.body.id,req.body.text], (err) => {
  
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    
        return res.json({ Status: "Success"});
        });
    }

    else if (account === 'teacher'){
        const sendTeacherMessageSql = "INSERT INTO Messages (Cid,Tid,content) VALUES (?,?,?)";
    
        db.query(sendTeacherMessageSql, [req.body.Cid,req.body.id,req.body.text], (err) => {
   
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    
        return res.json({ Status: "Success"});
        });
    }
 
});

router.post('/get', (req,res) => {

   
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