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

// --- New Statistics Endpoint ---
router.get('/statistics', async (req, res) => {
  try {
    const addedTodosCount = await getAsync('added_todos');
    // Default to 0 if the key doesn't exist in Redis
    const count = addedTodosCount ? parseInt(addedTodosCount) : 0;

    res.json({
      added_todos: count
    });
  } catch (error) {
    console.error('Error fetching statistics from Redis:', error);
    res.status(500).json({ error: 'Failed to retrieve statistics' });
  }
});
// --- End of New Statistics Endpoint ---

module.exports = router;
