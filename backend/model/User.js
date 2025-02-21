const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  category: {
    type: String,
    enum: [
      // Education Categories
      'Day School',
      'Boarding School',
      'Play School',
      'Private Tutor',
      'Coaching Centre',
      // Healthcare Categories
      'Hospital',
      'Private Clinic',
      'Medical Stores',
    ],
    required: function () {
      return this.userType === 'education' || this.userType === 'healthcare';
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user'],  // Explicitly define 'admin' and 'user'
    default: 'user',
  },
  status:{
    require:true,
    type:String,
    enum: ['block', 'active','unblock'],
    default:'active'
},
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
