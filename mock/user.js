const express = require('express');
const faker = require('faker');
const range = require('lodash/range');
const merge = require('lodash/merge');

const router = express.Router();

const generateUser = () => ({
  id: faker.random.uuid(),
  firstName: faker.name.findName(),
  lastName: faker.name.lastName(),
  avatar: faker.image.avatar(),
  age: faker.random.number({ min: 20, max: 40 }),
  phone: faker.phone.phoneNumber(),
});

const users = range(5000).map(generateUser);

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

router.post('/', (req, res) => {
  const params = req.body;

  const {
    id, firstName, lastName, avatar, phone,
  } = params;

  let {
    age,
  } = params;

  if (age != null) {
    age = +age;
  }

  let user = null;

  if (id) {
    user = users.find(u => u.id === id);

    if (user == null) {
      res.json({
        status: 404,
        message: 'not found',
      });

      return;
    }

    merge(user, {
      firstName, lastName, avatar, age, phone,
    });
  } else {
    user = merge(generateUser(), {
      firstName, lastName, avatar, age, phone,
    });
    users.unshift(user);
  }

  setTimeout(
    () => res.json({
      status: 0,
      data: user,
    }),
    300,
  );
});

module.exports = router;
