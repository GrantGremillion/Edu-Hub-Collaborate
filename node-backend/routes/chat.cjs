const express = require('express');
const router = express.Router();

const db = require('../database.cjs')


router.post('/get_message_usernames', (req,res) => {
    
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


router.post('/get_all_students', (req,res) => {
    
    const getStudentsSQL = 
    `
        SELECT 
        COALESCE(s.name) AS sender_username
        FROM 
        ClassStudents cs
        LEFT JOIN 
        slogin s ON cs.Sid = s.Sid
        WHERE
        cs.Cid = ?;
    `;

    db.query(getStudentsSQL, [req.body.Cid], (err,data) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ Status: "Success", students: data});
        });
    
});


router.post('/get_teacher', (req,res) => {
    
    const getTeacherSQL = 
    `
        SELECT 
        COALESCE(t.name) AS sender_username
        FROM 
        Classes c
        LEFT JOIN 
        tlogin t ON c.Tid = t.Tid
        WHERE
        c.Cid = 1;
    `;

    db.query(getTeacherSQL, [req.body.Cid], (err,data) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ Status: "Success", teacher: data});
        });
    
});


module.exports = router;