
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
    const createClassSql = "INSERT INTO Classes (Tid, class_name, class_description, access_key) VALUES (?, ?, ?, ?)";

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

// Lets a student leave a class.
router.post('/leave_class', (req,res) =>{

  const leaveClassSql = "DELETE FROM ClassStudents WHERE Cid = ? AND Sid = ?";
  
  db.query(leaveClassSql, [req.body.Cid, req.body.Sid], (err) => {

    if (err) {
        console.log(err);
        return res.json({ Status: "Server Side Error" });
    }
    return res.json({ Status: "Success" });
  });
});

// Deletes a class from the server, removes all people from the class first.
// NOTE: does not work yet.
router.post('/remove_class', (req,res) =>{

  // have to remove all students from the class first (or get sql foreign key constraint error.
  // Make query to get all Sid's by the given Cid, and then remove each row with matching Sid & Cid
  const getAllStudentsInClassSql = "SELECT Sid FROM ClassStudents WHERE Cid = ?";
  db.query(getAllStudentsInClassSql, [req.body.Cid], (err, studentIDs) => {

    if (err) {
      console.log(err);
      return res.json({ Status: "Server Side Error: error selecting student ID's." });
    }

    const removeStudentsFromClassSql = "DELETE FROM ClassStudents WHERE Cid = ? AND Sid = ?";
    for (x = 0; x < studentIDs.length; x++) {
      db.query(removeStudentsFromClassSql, [req.body.Cid, studentIDs[x]], (err) => {
        if (err) {
            console.log(err);
            return res.json({ Status: "Server Side Error: error removing students from a class." });
        }
      });
    }
    // all students removed from class, now delete all messages
  });

  // NOTE: must delete all messages in a class before removing that class or get foreign key error.
  // Cannot delete by class ID (Cid), MUST use primary key (Mid).
  // Make query to get all Mid's by their Cid and store the Mid's in an array.
  // Use for loop on array to make sql delete all messages by their Mid.
  const getAllMessageIDSql = "SELECT Mid FROM Messages WHERE Cid = ?";
  db.query(getAllMessageIDSql, [req.body.Cid], (err, messageIDs) => {

    if (err) {
      console.log(err);
      return res.json({ Status: "Server Side Error: error getting message ID's from a class." });
    }

    const removeMessagesFromClassSql = "DELETE FROM Messages WHERE Cid = ? AND Mid = ?";
    for (x = 0; x < messageIDs.length; x++) {
      db.query(removeMessagesFromClassSql, [req.body.Cid, messageIDs[x]], (err) => {
        if (err) {
            console.log(err);
            return res.json({ Status: "Server Side Error: error deleting a message." });
        }
      });
      console.log("Should have deleted a message with Mid: " + messageIDs[x]);
    }
    // all messages removed from class, now delete the class itself.
  });

  const deleteClassSql = "DELETE FROM Classes WHERE Cid = ?";
  db.query(deleteClassSql, [req.body.Cid], (err) => {
    if (err) {
      console.log(err);
      return res.json({ Status: "Server Side Error: error deleting a class." });
    }
    return res.json({ Status: "Success" });
  });
});


router.post('/get_teacher_classes', (req,res) => {

  const Tid = req.body.Tid;
  const getTeacherClassesSql = "SELECT Cid,class_name,class_description,access_key FROM Classes WHERE Tid = ?";

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
  const getClassesSql = "SELECT Cid,class_name,class_description,access_key FROM Classes WHERE Cid IN (?)";

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
  const getClassSql = "SELECT * FROM Classes WHERE Cid = ?";

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


