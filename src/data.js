const fs = require('fs');
const path = require('path');

// using the readFileSync function built into the fs library to read the contents of the accounts.json file and setting the encoding to utf8, now contains JSON
const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);
// Assigning the JSON contents of the accountData variable to accounts variable but converting the JSON to be a javascript object
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
);

const users = JSON.parse(userData);

const writeJSON = () => {
    // convert the account data to JSON
    const accountsJSON = JSON.stringify(accounts, null, 4);
    // write the variable data to a file 
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
}

module.exports = {
    accounts, 
    users, 
    writeJSON
}