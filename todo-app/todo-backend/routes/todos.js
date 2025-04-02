const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { getAsync, setAsync } = require('../redis'); // Import redis functions if needed elsewhere

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });
  // Update statistics (example - may vary based on exact redis implementation)
  try {
    const currentStats = (await getAsync('added_todos')) || 0;
    await setAsync('added_todos', parseInt(currentStats) + 1);
  } catch (e) {
    console.error('Redis error:', e);
    // Decide if failure to update stats should fail the request
  }
  res.send(todo);
});

const singleRouter = express.Router();

// Middleware to find a todo by ID and attach it to the request object
// This avoids code duplication in GET/:id and PUT/:id
const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Use Mongoose's findById which is optimized for ID lookups
    req.todo = await Todo.findById(id);
    if (!req.todo) {
      console.log(`Todo with ID ${id} not found.`);
      return res.sendStatus(404); // Send 404 Not Found if todo doesn't exist
    }
  } catch (error) {
    // Handle potential errors, e.g., invalid ID format (CastError in Mongoose)
    console.error(`Error finding todo by ID ${id}:`, error);
    // You might want to check error type, e.g., if (error.name === 'CastError') return res.sendStatus(400);
    return res.sendStatus(400); // Bad request often suitable for invalid ID format
  }
  next(); // Proceed to the actual route handler if todo is found
};

/* GET single todo. */
// Uses the findByIdMiddleware first
singleRouter.get('/', async (req, res) => {
  // The middleware already found the todo and attached it to req.todo
  // If we reach here, the todo exists.
  res.json(req.todo); // Send the found todo object as JSON
});

/* PUT update todo. */
// Uses the findByIdMiddleware first
singleRouter.put('/', async (req, res) => {
  // The middleware already found the todo and stored it in req.todo
  // If we reach here, the todo exists and we can update it.
  const { text, done } = req.body; // Get updated data from request body

  // Update the properties of the fetched todo document
  if (text !== undefined) {
    req.todo.text = text;
  }
  if (done !== undefined) {
    req.todo.done = done;
  }

  try {
    // Save the updated document back to the database
    const updatedTodo = await req.todo.save();
    res.json(updatedTodo); // Send the updated todo object back
  } catch (error) {
    console.error(`Error updating todo by ID ${req.params.id}:`, error);
    // Handle potential validation errors during save
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
