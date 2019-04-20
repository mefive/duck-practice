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

router.get('/', (req, res, next) => {
  let { start = 0, size = 10 } = req.query;

  start = +start;
  size = +size;

  res.data = users.slice(start, start + size);
  res.meta = {
    total: users.length,
  };

  next();
});

function checkError(params, next) {
  if (users.some(u => u.phone === params.phone && u.id !== params.id)) {
    next({
      status: 1001,
      message: 'phone duplicated',
    });
  }
}

router.post('/', (req, res, next) => {
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
      next({ status: 404, message: 'not found' });
    }

    checkError(params, next);

    merge(user, {
      firstName, lastName, avatar, age, phone,
    });
  } else {
    checkError(params, next);

    user = merge(generateUser(), {
      firstName, lastName, avatar, age, phone,
    });

    users.unshift(user);
  }

  res.data = user;

  next();
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    next({
      status: 404,
      message: 'user not found',
    });
  } else {
    users.splice(index, 1);
    res.data = 'ok';
    next();
  }
});

module.exports = router;
