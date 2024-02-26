
const express = require('express');
const router = express.Router();

const db = require('../database.cjs')


// Generates a random alphanumeric key that is ten characters long
const handleGenerateKey = (e) => {

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
    const createClassSql = "INSERT INTO class (Tid, class_name, class_description, access_key) VALUES (?, ?, ?, ?)";

    key = handleGenerateKey();
    db.query(createClassSql, [req.body.Tid, req.body.cname, req.body.cdes, key], (err) => {

        if (err) {
            console.log(err);
            return res.json({ Status: "Server Side Error" });
        }
        return res.json({ Status: "Success" });
    });
});




router.post('/get_classes', (req,res) => {
  const Tid = req.body.Tid;
  const getClassesSql = "SELECT class_id,class_name,class_description,access_key FROM class WHERE Tid = ?";


  db.query(getClassesSql, [Tid], (err, data) => {

    console.log(data);

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json({ Status: "Success", classes: data });
});


});

module.exports = router;


