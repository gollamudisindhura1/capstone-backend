// Defines RESTful routes for projects
// All routes are protected by auth middleware

const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

// GET /api/projects - List all user's projects
router.get('/', auth, getProjects);

// GET /api/projects/:id - Get single project details
router.get('/:id', auth, getProjectById);

// POST /api/projects - Create new project
router.post('/', auth, createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', auth, updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', auth, deleteProject);

module.exports = router;