const express = require('express');

const user = require('./user');

const app = express();

app.use('/api/users', user);

const PORT = 1986;

app.listen(PORT, () => console.log('Mock server is running on Port: ', PORT))
