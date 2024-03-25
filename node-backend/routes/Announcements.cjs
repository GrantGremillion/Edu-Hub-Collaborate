const express = require('express');
const router = express.Router();

const db = require('../database.cjs')


router.post('/send', (req,res) => {
        const sendMessageSql = "INSERT INTO classes (announce) VALUES (?)";
    
        db.query(sendMessageSql, [req.announce.text], (err) => {
  
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    
        return res.json({ Status: "Success"});
        });
});

router.post('/get', (req,res) => {

   
    const getMessagesSql = "SELECT announce FROM Messages WHERE Cid = ?";

    db.query(getMessagesSql, [req.body.Cid], (err,data) => {

    if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }

    return res.json({ Status: "Success", messages: data});
    });
    
});



module.exports = router;