
const express = require('express');
const router = express.Router();

const db = require('../database.cjs')

router.post('/create_set', (req,res) => {

    const name = req.body.name;
    const cards = req.body.cards;

    const createNotecardSetSQL = "INSERT INTO NotecardSets (set_name) VALUES (?)";
    const getSetIDSQL = "SELECT Setid FROM NotecardSets ORDER BY Setid DESC LIMIT 1";
    const createNotecardSQL = "INSERT INTO Notecards (Setid,term,definition) VALUES (?)";

    db.query(createNotecardSetSQL, [name], (err) => {

        if (err) {
        return res.status(500).json({ error: err.message });
        }

        // Gets the ID for the notecard set just created
        db.query(getSetIDSQL, (err,data) => {

            if (err) {
            return res.status(500).json({ error: err.message });
            }

            const setID = data[0].Setid;
        });

        for (let i = 0; i < cards.length; i++) {
            const item = cards[i];
            console.log(item);
        }

        return res.json({ Status: "Success"});
        
    });

});


module.exports = router;


