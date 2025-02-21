const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  userType: {
    required: true,
    type: String,
    enum: ['admin', 'education', 'healthcare'],
  },
 
  role: {
    type: String,
    enum: ['admin', 'user'],  
    default: 'admin',
  },
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
