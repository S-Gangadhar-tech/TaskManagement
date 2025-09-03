const express = require('express');
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../Controllers/taskController');
const { protect } = require('../Middlewares/auth');
const { taskValidation } = require('../Middlewares/validation');

const router = express.Router();

// All routes are protected
router.use(protect);

// Task statistics route
router.get('/stats', getTaskStats);

// Task CRUD routes
router
  .route('/')
  .get(getAllTasks)
  .post(taskValidation, createTask);

router
  .route('/:id')
  .get(getTask)
  .patch(taskValidation, updateTask)
  .delete(deleteTask);

module.exports = router;