//Import express
let express = require('express');
let fs = require('fs');
let path = require('path');
// Create the Express app
let app = express();


app.get('/images', (req,res) => {
    fs.readdir('public/images', (err, files) => {
        if(err) {
            res.status(500).send('Error reading files'); 
        } else {
            res.json({ files });
        }
    });
});

app.get('/Sound_Effects', (req,res) => {
    fs.readdir('public/Sound_Effects', (err, files) => {
        if(err) {
            res.status(500).send('Error reading files'); 
        } else {
            res.json({ files });
        }
    });
});


// Set the port used for server traffic.
let port = 3000;

// Middleware to serve static files from 'public' directory
app.use(express.static("public"));



//Step 3 code goes here
//Initialize file system module
// Middleware to serve static files from 'songs' directory
// Middleware for parsing JSON files
// API endpoint to get songs folder
// File directory endpoint to get list of file names
// Read file names into a JSON object - throw error otherwise

//Run server at port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});