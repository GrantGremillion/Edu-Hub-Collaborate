
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


router.post('/get_teacher_classes', (req,res) => {

  const Tid = req.body.Tid;
  const getTeacherClassesSql = "SELECT Cid,class_name,class_description,access_key FROM classes WHERE Tid = ?";

  db.query(getTeacherClassesSql, [Tid], (err, data) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json({ Status: "Success", classes: data });
  });
  
});



router.post('/get_student_classes', (req,res) => {

  const Sid = req.body.Sid;
  const getStudentClassesSql = "SELECT Cid FROM ClassStudents WHERE Sid = ?";
  const getClassesSql = "SELECT Cid,class_name,class_description,access_key FROM classes WHERE Cid IN (?)";

  db.query(getStudentClassesSql, [Sid], (err, data) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (data.length > 0){
      //const Cids = data;
      const Cids = data.map(classData => classData.Cid);
      console.log(Cids);
      db.query(getClassesSql, [Cids], (err, data) => {

        console.log(data);

        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        return res.json({ Status: "Success", classes: data });
      });
      
    }
  });
});


router.post('/get_current_class', (req,res) => {

  const Cid = req.body.Cid;
  const getClassSql = "SELECT * FROM classes WHERE Cid = ?";

  db.query(getClassSql, [Cid], (err, data) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (data.length > 0){
      
      return res.json({ Status: "Success", class: data });
    }
  });
});



module.exports = router;


