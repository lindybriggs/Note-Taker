const express = require('express');
const path = require('path');
// Importing api
const api = require('./public/assets/routes/api');

// Helper method for generating unique ids

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// With /api route, sent to api in routes
app.use('/api', api);



// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);