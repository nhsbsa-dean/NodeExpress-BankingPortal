// Requiring the node modules we need to use
const fs = require('fs');
const path = require('path');
const express = require('express');

// calling the express function and assigning it to a variable
const app = express();

// using the set function to configure the directory to views
app.set('views', path.join(__dirname, 'views'));
// setting the view engine to ejs
app.set('view engine', 'ejs');
// configuring the static directory which holds CSS/JS
app.use(express.static(path.join(__dirname, 'public')));

// using the readFileSync function built into the fs library to read the contents of the accounts.json file and setting the encoding to utf8, now contains JSON
const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);
// Assigning the JSON contents of the accountData variable to accounts variable but converting the JSON to be a javascript object
const accounts = JSON.parse(accountData);

// reading the contents of the users.json file and setting the encoding to utf8, userData now contains JSON
const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
);
// Assigning the JSON content in userData to a new variable but converting the JSON to be a javascript object
const users = JSON.parse(userData);

// Account routes
// Creating the index route which points to the root '/' renders the index view and passes in an object with a single key value pair title: index (render is a function of the respond object)
app.get('/', (req, res) => res.render('index', {title: 'Account Summary', accounts: 'accounts'}));
// Creating the savings route which points to /savings and renders the savings view and passes in an object key value pair
app.get('/savings', (req, res) => res.render('account', { account: account.savings }));
// Creating the checking route which points to /checking and renders the checking view and passes in an object key value pair
app.get('/checking', (req, res) => res.render('account', {account: account.checking}));
// Creating the credit route which points to /credit and renders the credit view and passes in an object key value pair
app.get('/credit', (req, res) => res.render('account', {account: account.credit}));

// Profile routes
// Creating the profile route which points to /profile and renders the profile view and passes in an object key value pair
app.get('/profile', (req, res) => res.render('profile', { user: users[0] }));

// create a server listening on port 3000 and logs a message to the console
app.listen(3000, () => console.log('PS Project Running on port 3000!'));