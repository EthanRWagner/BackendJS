//run while coding: "npm run dev"
//run in prod env: "npm start"

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

//filtering the user_list by name
const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

//filtering the user_list by id
function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

//adding a new user to user_list
function addUser(user){
    users['users_list'].push(user);
}

//route managing for name request
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

//route managing for id request
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

//post a new user
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});