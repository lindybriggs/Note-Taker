const notes = require('express').Router();
// const notesDb = require('../../../db/db.json')
const notesDb = require('../db/db.json')
const uuid = require('../../../helpers/uuid')
const fs = require('fs')
const path = require('path')

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    console.log(notesDb)
    res.json(notesDb);
});

// POST Route for a new note
notes.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid()
        };
        notesDb.push(newNote);
        let notesArray = JSON.stringify(notesDb);
        

        fs.writeFile(path.join(__dirname, '../db/db.json'), notesArray, (err) => {
            if (err) throw err;
            console.log(`Review for ${newReview.product} has been written to JSON file`)
        });
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
        res.status(201).json(response);

    } else {
        res.status(500).json('Error in adding review');
    }
}
);

module.exports = notes;
