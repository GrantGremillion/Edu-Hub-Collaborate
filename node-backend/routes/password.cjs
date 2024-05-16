
const express = require('express');
const router = express.Router();

const db = require('../database.cjs')
const bcrypt = require("bcrypt");



//Chnage password endpoint
router.post('/change-password', async (req, res) => {

  // student account
  if (req.body.account === 'student') {

    // Ending AND checks if the password they entered was correct
    const checkPasswordSQL = "UPDATE Slogin SET password = ? WHERE Sid = ? AND password = ?";

    db.query(checkPasswordSQL, [req.body.newPW, req.body.id, req.body.oldPW], (err, data) => {

      if (data.changedRows === 0) {
        return res.json({ Status: "Incorrect old password" });
      }

      if (err) {
        console.log(err);
        return res.json({ Status: "Server Side Error" });
      }

      else {
        return res.json({ Status: "Success" });
      }

    });
  }

  // teacher account
  else if (req.body.account === 'teacher') {

    let oldPW;
    let newPW;

    bcrypt.hash(req.body.oldPW, 5, (err, oldHashedPassword) => {
      if (err) {
        return res.json({ Status: "Server Side Error" });
      }
      oldPW = oldHashedPassword;
      console.log(oldPW);
    });

    bcrypt.hash(req.body.newPW, 5, (err, newHashedPassword) => {
      if (err) {
        return res.json({ Status: "Server Side Error" });
      }
      newPW = newHashedPassword
    });

    const checkPasswordSQL = "UPDATE Tlogin SET password = ? WHERE Tid = ? AND password = ?";

    db.query(checkPasswordSQL, [newPW, req.body.id, oldPW], (err, data) => {

      if (data.changedRows === 0) {
        return res.json({ Status: "Incorrect old password" });
      }

      if (err) {
        console.log(err);
        return res.json({ Status: "Server Side Error" });
      }

      else {
        return res.json({ Status: "Success" });
      }

    });
  }

});

module.exports = router;