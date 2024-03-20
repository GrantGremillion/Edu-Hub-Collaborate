const express = require('express');
const router = express.Router();

const db = require('../database.cjs')



router.post('/send', (req,res) => {

    const account = req.body.account;


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


router.post('/get_users', (req,res) => {
    
    const getUsersSQL = 
    `
        SELECT 
            COALESCE(s.name, t.name) AS sender_username
        FROM 
            messages m
        LEFT JOIN 
            slogin s ON m.Sid = s.Sid
        LEFT JOIN 
            tlogin t ON m.Tid = t.Tid
        WHERE
            m.Cid = ?;
    `;

    db.query(getUsersSQL, [req.body.Cid], (err,data) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ Status: "Success", users: data});
        });
    
});





module.exports = router;