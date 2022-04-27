const api = require('express').Router();

// Importing modular routers for /notes
const notes = require ('./notes');

// /api/notes sends you to notes file
api.use('/notes', notes);

module.exports = api;