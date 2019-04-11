const express = require('express');
const faker = require('faker');
const range = require('lodash/range');

const router = express.Router();

const users = range(50).map(() => ({
  id: faker.random.uuid(),
  firstName: faker.name.findName(),
  lastName: faker.name.lastName(),
  avatar: faker.image.avatar(),
  age: faker.random.number({ min: 20, max: 40 }),
  phone: faker.phone.phoneNumber(),
}));

router.get('/', (req, res) => {
  setTimeout(() => res.json({
    status: 0,
    data: users,
    total: 50,
  }), 300);
});

module.exports = router;
