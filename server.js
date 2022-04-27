const express = require('express');
const path = require('path');
// Importing api
const api = require('./routes/api');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// With /api route, sent to api in routes
app.use('/api', api);

// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// GET Route for homepage
// app.use(express.static('public')); already does this essentially
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// WHEN I click on the link to the notes page 
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET Route for homepage upon wildcard entry
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
