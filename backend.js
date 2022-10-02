//run while coding: "npm run dev"
//run in prod env: "npm start"

// alphabet and numbers
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// import cross-origin resourse sharing
const cors = require('cors');
//imported express module for http calls to route
const express = require('express');
//instance of express
const app = express();
const port = 5000;

// use cross-origin resource sharing
app.use(cors());
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

function makeIdRandom(length){
    var id = "";
    for(let i=0; i<length; i++){
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}

//deleting a user from user_list
function deleteUser(user) {
    const user_count = users['users_list'].length;
    for (var i = 0; i < user_count; i++){
        if (users['users_list'][i]['id'] === user) {
            users['users_list'].splice(i, 1);
            return;
        }
    }
}

//route managing for name request
app.get('/users', (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    if (name != undefined && id != undefined){
        let  result = findUserByName(name);
        const target = result.filter( (user) => user['id'] === id);
        res.send(target);
    }
    else if (name != undefined && id === undefined){
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
    userToAdd['id'] = makeIdRandom(6);
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();
});

//delete an existing user
app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        deleteUser(id);
        res.status(204);
    }
});