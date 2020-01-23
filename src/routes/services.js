const express = require('express');
const router = express.Router();
const { accounts } = require('../data');
const { writeJSON } = require('../data');

// Creating the transfer route which points to /transfer and renders the transfer view
router.get('/transfer', (req, res) => res.render('transfer'));

// Creating the transfer post route which points to /transfer
router.post('/transfer', (req, res) => {
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
router.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }));

// Creating the payment post route
router.post('/payment', (req, res) => {
    // Subtracting the amount from the balance and saving to account.credit.balance (-=)
    accounts.credit.balance -= req.body.amount;
    // Adding the amount to available and saving to accounts.credit.available (+=)
    accounts.credit.available += parseInt(req.body.amount, 10);
    
    // Calling the function from the ./data module
    writeJSON();

    // rendering with the following message and credit
    res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router