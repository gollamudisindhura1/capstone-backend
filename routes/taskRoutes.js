const express = require('express');
const router = express.Router({ mergeParams: true }); 

const auth = require('../middleware/auth');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// All routes require auth
router.use(auth);

// GET /api/projects/:projectId/tasks
router.get('/', getTasks);

// GET /api/projects/:projectId/tasks/:taskId
router.get('/:taskId', getTaskById);

// POST /api/projects/:projectId/tasks
router.post('/', createTask);

// PUT /api/projects/:projectId/tasks/:taskId
router.put('/:taskId', updateTask);

// DELETE /api/projects/:projectId/tasks/:taskId
router.delete('/:taskId', deleteTask);

module.exports = router;