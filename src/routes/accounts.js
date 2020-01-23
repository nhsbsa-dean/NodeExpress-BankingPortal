const express = require('express');
const router = express.Router();
const { accounts } = require('../data');

// Creating the savings route which points to /savings and renders the savings view and passes in an object key value pair
router.get('/savings', (req, res) => res.render('account', { account: accounts.savings }));
// Creating the checking route which points to /checking and renders the checking view and passes in an object key value pair
router.get('/checking', (req, res) => res.render('account', {account: accounts.checking}));
// Creating the credit route which points to /credit and renders the credit view and passes in an object key value pair
router.get('/credit', (req, res) => res.render('account', {account: accounts.credit}));

module.exports = router;