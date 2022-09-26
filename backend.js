//imported express module for http calls to route
const express = require('express');
//instance of express
const app = express();
const port = 5000;

//express app to process data
app.use(express.json());

//API endpoint (URL pattern, callback function (request, repsonse))
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// backend server listneing for requests
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      