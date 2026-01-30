// Schema for Tasks - each task belongs to one project
// Includes status, priority, due date (for planner), and optional time fields

const {Schema, model} = require('mongoose');

const taskSchema = new Schema({

    // Title - required, trimmed
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [1, 'Title must not be empty'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },

  // Description - optional
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },

  // Status - enum for controlled values (To Do, In Progress, Done)
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do'
  },

  // Priority - enum (Low, Medium, High) for sorting/filtering
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },

  // Due date - for day planner view
  dueDate: {
    type: Date,
    default: null
  },

  // Optional: start/end time for time-specific tasks (e.g., meetings)
  startTime: {
    type: Date,
    default: null
  },
  endTime: {
    type: Date,
    default: null
  },

  // Project reference - which project this task belongs to
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Task must belong to a project']
  },

  // Creator/owner - references User (for ownership checks later)
  createdBy: {
    type:Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Timestamps
}, {
  timestamps: true
});

// Optional: Virtual to populate project if needed (rare)
taskSchema.virtual('projectDetails', {
  ref: 'Project',
  localField: 'project',
  foreignField: '_id',
  justOne: true
});

taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

// Create and export model
module.exports = model('Task', taskSchema);

