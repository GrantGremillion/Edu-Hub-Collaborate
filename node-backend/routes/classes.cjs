
const express = require('express');
const router = express.Router();

const db = require('../database.cjs')

const handleGenerateKey = (e) => {

    // Generates a random alphanumeric key that is ten characters long
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }


router.post('/create_class', (req,res) =>{
    const insertUserQuery = "INSERT INTO class (class_name, class_description, access_key) VALUES (?, ?, ?)";
    key = handleGenerateKey();
    db.query(insertUserQuery, [req.body.cname, req.body.cdes, key], (err) => {

        if (err) {
            console.log(err);
            return res.json({ Status: "Server Side Error" });
        }
        return res.json({ Status: "Success" });
    });
});

module.exports = router;


