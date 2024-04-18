
const express = require('express');
const router = express.Router();

const db = require('../database.cjs')

router.post('/create_set', (req,res) => {


    const name = req.body.name;
    const cards = req.body.cards;

    const createNotecardSetSQL = "INSERT INTO NotecardSets (set_name) VALUES (?)";
    const getSetIDSQL = "SELECT Setid FROM NotecardSets ORDER BY Setid DESC LIMIT 1";
    let createNotecardSQL = "INSERT INTO Notecards (Setid,term,def) VALUES";

    db.query(createNotecardSetSQL, [name], (err) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Gets the ID for the notecard set just created
        db.query(getSetIDSQL, (err,data) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            setID = data[0].Setid;



            let values = [];

            cards.forEach(card => {
                const term = card.term;
                const definition = card.definition;
                
                // Push the values into the array
                values.push(`(${db.escape(setID)}, ${db.escape(term)}, ${db.escape(definition)})`);
            });

            // Concatenate the values and execute the query
            if (values.length > 0) {
                createNotecardSQL += values.join(",");
                db.query(createNotecardSQL, (err) => {
                    if (err) {
                        // Handle error
                        console.error(err);
                    } else {
                        // Query executed successfully
                        console.log("Cards inserted successfully");
                    }
                });
            } 
            else {
                console.log("No cards to insert");
            }
            
        });
        
        return res.json({ Status: "Success"});
        
    });

});


module.exports = router;


