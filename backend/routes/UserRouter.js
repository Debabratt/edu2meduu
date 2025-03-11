const express = require('express');
const UserRouter = express.Router();
const {registerUser} = require('../controller/Usercontroller');
const {loginUser} = require('../controller/Usercontroller');
const {getAllCategories} = require('../controller/Usercontroller');
const {requestCall} = require('../controller/Usercontroller');
const {getAllUsers } = require('../controller/Usercontroller');
const {getHealthcareUsers } = require('../controller/Usercontroller');
const {updateProfile } = require('../controller/Usercontroller');
const {sendPasswordLink } = require('../controller/Usercontroller');
const {forgotpassword} = require('../controller/Usercontroller');
const {resetPassword} = require('../controller/Usercontroller');
const {searchEducation} = require('../controller/Usercontroller');
const {searchHealthcare} = require('../controller/Usercontroller');
const {createJob} = require('../controller/Usercontroller');


UserRouter.post('/register', registerUser);
UserRouter.post('/login',loginUser);
UserRouter.get('/getallcategories',getAllCategories)
UserRouter.post('/requestcall',requestCall)
UserRouter.get('/getAllUsers',getAllUsers )
UserRouter.get('/getHealthcareUsers',getHealthcareUsers )
UserRouter.patch('/updateProfile',updateProfile)
UserRouter.post('/reset-password',sendPasswordLink)

UserRouter.get('/forgotpassword/:id/:token',forgotpassword)
UserRouter.post('/updatepassword/:id/:token',resetPassword)


UserRouter.get('/searchEducation',searchEducation)
UserRouter.get('/searchHealthcare',searchHealthcare)
UserRouter.post('/createjob',createJob)

module.exports = UserRouter;
