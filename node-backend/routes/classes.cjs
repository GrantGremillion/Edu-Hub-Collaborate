
const express = require('express');
const router = express.Router();

const db = require('../database.cjs')


router.post('/create_class', (req,res) =>{
    const insertUserQuery = "INSERT INTO class (class_name, class_description) VALUES (?, ?)";
    db.query(insertUserQuery, [req.body.cname, req.body.cdes], (err) => {

        if (err) {
            console.log(err);
            return res.json({ Status: "Server Side Error" });
        }
        return res.json({ Status: "Success" });
    });
});

module.exports = router;