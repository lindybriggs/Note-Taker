const api = require('express').Router();

// Importing modular routers for /notes
const notes = require ('./notes');

// /api/notes sends you to notes.js file
api.use('/notes', notes);

// Exporting api to use in server.js
module.exports = api;