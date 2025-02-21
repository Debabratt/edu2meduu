const express = require('express');
const UserRouter = express.Router();
const {registerUser} = require('../controller/Usercontroller');
const {loginUser} = require('../controller/Usercontroller');

UserRouter.post('/register', registerUser);
UserRouter.post('/login',loginUser);

module.exports = UserRouter;
