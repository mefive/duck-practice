const express = require('express');
const { argv } = require('yargs');
const bodyParser = require('body-parser');

const user = require('./user');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', user);

app.use((req, res, next) => setTimeout(next, 300));

app.use((req, res) => {
  if (res.data) {
    res.json({
      status: 0,
      data: res.data,
      meta: res.meta,
    });
  }
});

app.use((err, req, res) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = argv.port || 1986;

app.listen(PORT, () => console.log('Mock server is running on Port: ', PORT));
