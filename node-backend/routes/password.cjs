
const express = require('express');
const router = express.Router();

const db = require('../database.cjs')



//Chnage password endpoint
router.post('/change-password', async (req, res) => {
  
    // student account
    if (req.body.account === 'student'){
  
      // Ending AND checks if the password they entered was correct
      const checkPasswordSQL = "UPDATE Slogin SET password = ? WHERE Sid = ? AND password = ?";
  
      db.query(checkPasswordSQL, [req.body.newPW,req.body.id,req.body.oldPW], (err,data) => {
  
        if (data.changedRows === 0){
          return res.json({ Status: "Incorrect old password" });
        }
  
        if (err) {
            console.log(err);
            return res.json({ Status: "Server Side Error" });
        }
  
        else{
          return res.json({ Status: "Success"});
        }
  
      });
    }
  
    // teacher account
    else if (req.body.account === 'teacher'){
  
      const checkPasswordSQL = "UPDATE Tlogin SET password = ? WHERE Tid = ? AND password = ?";
  
      db.query(checkPasswordSQL, [req.body.newPW,req.body.id,req.body.oldPW], (err,data) => {
  
        if (data.changedRows === 0){
          return res.json({ Status: "Incorrect old password" });
        }
  
        if (err) {
            console.log(err);
            return res.json({ Status: "Server Side Error" });
        }
  
        else{
          return res.json({ Status: "Success"});
        }
  
      });
    }
  
  });

  module.exports = router;