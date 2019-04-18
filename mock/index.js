const express = require('express');
const { argv } = require('yargs');
const bodyParser = require('body-parser');

const user = require('./user');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', user);

const PORT = argv.port || 1986;

app.listen(PORT, () => console.log('Mock server is running on Port: ', PORT));
