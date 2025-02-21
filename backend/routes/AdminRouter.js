const express = require('express');
const AdminRouter = express.Router();
const {adminLogin} = require('../controller/Admincontroller');
const {getEducationUsers} = require('../controller/Admincontroller');
const { getHealthcareUsers} = require('../controller/Admincontroller');
AdminRouter.post('/adminlogin',adminLogin);

AdminRouter.get('/getHealthcareUsers', getHealthcareUsers);
AdminRouter.get('/getEducationUsers', getEducationUsers);
module.exports = AdminRouter;