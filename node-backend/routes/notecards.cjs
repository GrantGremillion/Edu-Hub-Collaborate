
const express = require('express');
const router = express.Router();

const db = require('../database.cjs')

router.post('/create_set', (req, res) => {

    const name = req.body.name;
    const cards = req.body.cards;

    const class_id = req.body.Cid;

    const createNotecardSetSQL = "INSERT INTO NotecardSets (Cid,set_name) VALUES (?,?)";
    const getSetIDSQL = "SELECT Setid FROM NotecardSets ORDER BY Setid DESC LIMIT 1";
    let createNotecardSQL = "INSERT INTO Notecards (Setid,term,def) VALUES";

    db.query(createNotecardSetSQL, [class_id, name], (err) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Gets the ID for the notecard set just created
        db.query(getSetIDSQL, (err, data) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            setID = data[0].Setid;


            // Values to be inserted into Notecards table
            let values = [];

            // Formatting values to work with sql query
            cards.forEach(card => {
                const term = card.term;
                const definition = card.definition;

                values.push(`(${db.escape(setID)}, ${db.escape(term)}, ${db.escape(definition)})`);
            });

            // Concatenate the values and execute the query
            if (values.length > 0) {
                createNotecardSQL += values.join(",");
                db.query(createNotecardSQL, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        return res.json({ Status: "Success" });
                    }
                });
            }
            else {
                console.log("No cards to insert");
            }

        });

    });
});

router.post('/get_sets', (req, res) => {

    class_id = req.body.Cid;

    const getAllNotecardSetsSQL = "SELECT * FROM NotecardSets WHERE Cid = ?";

    db.query(getAllNotecardSetsSQL, [class_id], (err, data) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.json({ Status: "Success", Sets: data });

    });
});

router.post('/get_set_name', (req, res) => {

    set_id = req.body.Sid;

    const getSetNameSQL = "SELECT set_name FROM NotecardSets WHERE Setid = ?";

    db.query(getSetNameSQL, [set_id], (err, data) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.json({ Status: "Success", Name: data });

    });
});

router.post('/get_notecards', (req, res) => {

    set_id = req.body.Sid;

    const getNotecardsSQL = "SELECT term,def FROM Notecards WHERE Setid = ?";

    db.query(getNotecardsSQL, [set_id], (err, data) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.json({ Status: "Success", Cards: data });

    });
});


module.exports = router;


