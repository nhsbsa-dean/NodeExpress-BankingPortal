// Requiring the node modules we need to use
const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');

// calling the express function and assigning it to a variable
const app = express();

// using the set function to configure the directory to views
app.set('views', path.join(__dirname, 'views'));
// setting the view engine to ejs
app.set('view engine', 'ejs');
// configuring the static directory which holds CSS/JS
app.use(express.static(path.join(__dirname, 'public')));
// Express middleware to handle POST data
app.use(express.urlencoded());

// Account routes
// Creating the index route which points to the root '/' renders the index view and passes in an object with a single key value pair title: index (render is a function of the respond object)
app.get('/', (req, res) => res.render('index', {title: 'Account Summary', accounts: accounts}));
// Creating the savings route which points to /savings and renders the savings view and passes in an object key value pair
app.get('/savings', (req, res) => res.render('account', { account: accounts.savings }));
// Creating the checking route which points to /checking and renders the checking view and passes in an object key value pair
app.get('/checking', (req, res) => res.render('account', {account: accounts.checking}));
// Creating the credit route which points to /credit and renders the credit view and passes in an object key value pair
app.get('/credit', (req, res) => res.render('account', {account: accounts.credit}));
// Creating the transfer route which points to /transfer and renders the transfer view
app.get('/transfer', (req, res) => res.render('transfer'));
// Creating the transfer post route which points to /transfer
app.post('/transfer', (req, res) => {
    // Calculate and set the name="FROM" balance 
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    // Calculate and set the name="to" balance
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance + parseInt(req.body.amount, 10));
    
    // Calling the function from the ./data module
    writeJSON();

    // redirec with the following message
    res.render('transfer', { message: "Transfer Completed" });
});
// Creating the payment route which points to /payment
app.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }));
// Creating the payment post route
app.post('/payment', (req, res) => {
    // Subtracting the amount from the balance and saving to account.credit.balance (-=)
    accounts.credit.balance -= req.body.amount;
    // Adding the amount to available and saving to accounts.credit.available (+=)
    accounts.credit.available += parseInt(req.body.amount, 10);
    
    // Calling the function from the ./data module
    writeJSON();

    // rendering with the following message and credit
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

// Profile route
// Creating the profile route which points to /profile and renders the profile view and passes in an object key value pair
app.get('/profile', (req, res) => res.render('profile', { user: users[0] }));

// create a server listening on port 3000 and logs a message to the console
app.listen(3000, () => console.log('PS Project Running on port 3000!'));