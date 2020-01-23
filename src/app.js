// Requiring the node modules we need to use
const fs = require('fs');
const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

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
app.use('/account', accountRoutes);
// Creating the index route which points to the root '/' renders the index view and passes in an object with a single key value pair title: index (render is a function of the respond object)
app.get('/', (req, res) => res.render('index', {title: 'Account Summary', accounts: accounts}));

// Transfer and payments routes
app.use('/services', servicesRoutes);

// Profile route
// Creating the profile route which points to /profile and renders the profile view and passes in an object key value pair
app.get('/profile', (req, res) => res.render('profile', { user: users[0] }));

// create a server listening on port 3000 and logs a message to the console
app.listen(3000, () => console.log('PS Project Running on port 3000!'));