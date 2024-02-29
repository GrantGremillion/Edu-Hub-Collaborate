
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
    const createClassSql = "INSERT INTO classes (Tid, class_name, class_description, access_key) VALUES (?, ?, ?, ?)";

    key = handleGenerateKey();
    db.query(createClassSql, [req.body.Tid, req.body.cname, req.body.cdes, key], (err) => {

        if (err) {
            console.log(err);
            return res.json({ Status: "Server Side Error" });
        }
        return res.json({ Status: "Success" });
    });
});


router.post('/join_class', (req,res) =>{

  const searchAccessKeySql = "SELECT Cid FROM Classes WHERE access_key = ?";
  const joinClassSql = "INSERT INTO ClassStudents (Cid, Sid) VALUES (?, ?)";
  
  db.query(searchAccessKeySql, [req.body.key], (err,results) => {

    if (err) {
        console.log(err);
        return res.json({ Status: "Server Side Error" });
    }

    if (results.length > 0) {
      const Cid = results[0].Cid; 

      // Execute the second query using the retrieved Cid
      db.query(joinClassSql, [Cid, req.body.Sid], (err) => {
          if (err) {
              console.log(err);
              return res.json({ Status: "Server Side Error" });
          }
          return res.json({ Status: "Success" });
      });
    
    } 
    else {
      return res.json({ Status: "Class not found" });
    }
  });
});


router.post('/get_classes', (req,res) => {
  const Tid = req.body.Tid;
  const getClassesSql = "SELECT Cid,class_name,class_description,access_key FROM classes WHERE Tid = ?";


  db.query(getClassesSql, [Tid], (err, data) => {

    console.log(data);

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json({ Status: "Success", classes: data });
});


});

module.exports = router;


