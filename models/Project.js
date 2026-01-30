// Schema for Projects - each project belongs to one owner (User)
// Includes name, description, and reference to tasks later

const {Schema, model} = require('mongoose');

const projectSchema = new Schema({
    name :{
        type: String,
        required: [true, 'Project name is required.'],
        trim: true,
        minlength: [3,'Project name must be at least 3 characters'],
    maxlength: [100, 'Project name cannot exceed 100 characters']
    },
    // Optional description
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },

  // Owner: reference to User model (who created the project)
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Project must have an owner']
  },

  // Optional: collaborators array (for stretch goal later)
  collaborators: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['viewer', 'editor'], default: 'viewer' }
  }],

  // Timestamps: createdAt, updatedAt
}, {
  timestamps: true
});

// Optional: Virtual field to populate tasks (useful later when querying)
projectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'project'
});

// Ensure virtuals are included when converting to JSON
projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

// Create and export the model
module.exports = model('Project', projectSchema);

