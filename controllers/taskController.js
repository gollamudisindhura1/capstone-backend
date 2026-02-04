// Handles CRUD for Tasks, nested under projects
// All operations require user owns the parent project

const Project = require("../models/Project");
const Task = require("../models/Task");

//Check if user owns the project

const checkProjectOwnership = async (getProjectById, userId) => {
  const project = await Project.findOne({ _id: getProjectById, owner: userId });
  if (!project) {
    throw new Error("Project not found or you don not own it.");
  }
  return project;
};

// GET all the tasks for a specific project

const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    // verify the ownership
    // await checkProjectOwnership(projectId, req.user._id);

    const tasks = await Task.find({ project: projectId })
      .sort({ priority: -1, dueDate: 1 })
      .select("-__v");

    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error.message);
    if (error.message.includes("not found or you do not own")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error fetching tasks" });
  }
};

// GET single task
const getTaskById = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    //await checkProjectOwnership(projectId, req.user._id);

    const task = await Task.findOne({ _id: taskId, project: projectId }).select(
      "-__v",
    );
    if (!task) {
      return res.status(404).jso({ message: "Task not found in this project" });
    }
    res.json(task);
  } catch (error) {
    console.error("Get task error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
// 3. POST create new task in a project

const createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, status, priority, dueDate, startTime, endTime } =
      req.body;
    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }
    await checkProjectOwnership(projectId, req.user._id);

    const task = new Task({
      title,
      description: description || "",
      status: status || "To Do",
      priority: priority || "Medium",
      dueDate: dueDate ? new Date(dueDate) : null,
      startTime: startTime ? new Date(startTime) : null,
      endTime: endTime ? new Date(endTime) : null,
      project: projectId,
      createdBy: req.user._id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error.message);
    if (error.message.includes("not found or you do not own")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error creating task" });
  }
};

// PUT update task

const updateTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const updates = req.body;

    await checkProjectOwnership(projectId, req.user._id);

    const task = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },
      updates,
      { new: true, runValidators: true },
    );

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found in this project" });
    }

    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error updating task" });
  }
};

// 5. DELETE task
const deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    await checkProjectOwnership(projectId, req.user._id);

    const task = await Task.findOneAndDelete({
      _id: taskId,
      project: projectId,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found in this project" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server error deleting task" });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
