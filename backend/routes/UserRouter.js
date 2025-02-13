const express = require('express');
const UserRouter = express.Router();
const {registerUser} = require('../controller/Usercontroller');
const {loginUser} = require('../controller/Usercontroller');
const {adminLogin} = require('../controller/Usercontroller');
UserRouter.post('/register', registerUser);
UserRouter.post('/login',loginUser);
UserRouter.post('/adminlogin',adminLogin);
module.exports = UserRouter;
