// Handles CRUD operations for Projects with ownership enforcement

const Project = require('../models/Project');

// 1. GET all projects for the logged-in user (owner only)
const getProjects = async (req, res) => {
  try {
    // Find projects where owner matches the authenticated user (from auth middleware)
    const projects = await Project.find({ owner: req.user._id })
      .sort({ createdAt: -1 }) // Newest first
      .select('-__v'); // Exclude version key

    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error fetching projects' });
  }
};

// 2. GET single project (owner only)
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id
    }).select('-__v');

    if (!project) {
      return res.status(404).json({ message: 'Project not found or you do not own it' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 3. POST create new project (owner = current user)
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const project = new Project({
      name,
      description: description || '',
      owner: req.user._id  // Automatically set to logged-in user
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error creating project' });
  }
};

// 4. PUT update project (owner only)
const updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Find project and ensure current user is owner
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or you do not own it' });
    }

    // Update fields if provided
    if (name) project.name = name;
    if (description !== undefined) project.description = description;

    await project.save();

    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error updating project' });
  }
};

// 5. DELETE project (owner only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found or you do not own it' });
    }

    // Optional: Delete associated tasks later (we'll add when doing tasks)
    // await Task.deleteMany({ project: project._id });

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error deleting project' });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};