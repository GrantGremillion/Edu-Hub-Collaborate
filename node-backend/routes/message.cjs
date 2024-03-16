const express = require('express');
const router = express.Router();

const db = require('../database.cjs')



router.post('/send', (req,res) => {

    const account = req.body.account;


    if (account === 'student'){
        const sendStudentMessageSql = "INSERT INTO Messages (Sid,content) VALUES (?,?)";
    
        db.query(sendStudentMessageSql, [req.body.id,req.body.text], (err) => {
  
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    
        return res.json({ Status: "Success"});
        });
    }
 
});

router.post('/get', (req,res) => {

   
    const getMessagesSql = "SELECT * FROM Messages";

    db.query(getMessagesSql, [], (err,data) => {

    if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }

    return res.json({ Status: "Success", messages: data});
    });
    
});



module.exports = router;