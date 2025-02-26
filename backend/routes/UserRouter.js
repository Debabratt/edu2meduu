const express = require('express');
const UserRouter = express.Router();
const {registerUser} = require('../controller/Usercontroller');
const {loginUser} = require('../controller/Usercontroller');
const {getAllCategories} = require('../controller/Usercontroller');
const {requestCall} = require('../controller/Usercontroller');


UserRouter.post('/register', registerUser);
UserRouter.post('/login',loginUser);
UserRouter.get('/getallcategories',getAllCategories)
UserRouter.post('/requestcall',requestCall)
module.exports = UserRouter;
