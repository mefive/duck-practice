const express = require('express');
const faker = require('faker');
const range = require('lodash/range');

const router = express.Router();

const users = range(5000).map(() => ({
  id: faker.random.uuid(),
  firstName: faker.name.findName(),
  lastName: faker.name.lastName(),
  avatar: faker.image.avatar(),
  age: faker.random.number({ min: 20, max: 40 }),
  phone: faker.phone.phoneNumber(),
}));

router.get('/', (req, res) => {
  let { start = 0, size = 10 } = req.query;

  start = +start;
  size = +size;

  setTimeout(() => res.json({
    status: 0,
    data: users.slice(start, start + size),
    total: users.length,
  }), 300);
});

module.exports = router;
