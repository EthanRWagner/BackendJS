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

//list of users in JSON format
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
}

//returns entire list of users
app.get('/users', (req, res) => {
    res.send(users);
});