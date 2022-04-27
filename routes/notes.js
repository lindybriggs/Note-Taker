const notes = require('express').Router();
const notesDb = require('../db/db.json')
const uuid = require('../helpers/uuid')
const fs = require('fs')
const path = require('path')

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    console.log(notesDb)
    res.json(notesDb);
});

// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// POST Route for a new note
// ----------------------------------------------------------------------------------------------------
// Log that a POST request was received
// Check to make sure requet contains a title and text to then create newNote object with those params plus a generated id
// Push this newNote to the database and stringify it
// Rewrite db file with updated notesArray
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
        notesDb.push(newNote);
        let notesArray = JSON.stringify(notesDb);


        fs.writeFile(path.join(__dirname, '../db/db.json'), notesArray, (err) => {
            if (err) throw err;
            console.log(`Review for ${newNote.title} has been written to JSON file`)
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

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
// This request also refreshes the page to render the updated database notes array
notes.delete('/:id', (req, res) => {
    const requestedId = req.params.id

    for (let i = 0; i < notesDb.length; i++) {
        if (requestedId === notesDb[i].id) {
            notesDb.splice(i, 1);
            break;
        }
    }
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notesDb), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Your note has been deleted.`)
        }
    });
    location.reload();
})

// Exporting notes to use in api.js
module.exports = notes;

