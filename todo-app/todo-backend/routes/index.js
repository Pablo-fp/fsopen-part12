const express = require('express');
const router = express.Router();

const { getAsync, setAsync } = require('../redis'); // Existing redis import likely here or in todos.js
const redis = require('../redis'); // <--- ADD THIS LINE FOR TESTING

const configs = require('../util/config');

let visits = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits
  });
});

module.exports = router;
