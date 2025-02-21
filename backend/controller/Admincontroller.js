

const Admin=require('../model/Admin')
const User = require('../model/User');

exports.adminLogin = async (req, res) => {
    try {
      const { email, password, userType } = req.body;
      
  
      // Find admin by email and userType
      const admin = await Admin.findOne({ email, userType });
      if (!admin || admin.password !== password) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
      }
  
      // If login is successful, return only necessary admin data (excluding password)
      const { password: _, ...adminData } = admin.toObject(); // Exclude password
  
      res.json({ 
        success: true, 
        message: "Admin login successful", 
        admin: adminData 
      });
  
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  




  exports.getEducationUsers = async (req, res) => {
    try {
      // Fetch only users where userType is 'Education'
      const users = await User.find({ userType: "education" }, "-password");
  
      res.status(200).json({ success: true, users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

  exports.getHealthcareUsers = async (req, res) => {
    try {
      // Fetch only users where userType is 'Education'
      const users = await User.find({ userType: "healthcare" }, "-password");
  
      res.status(200).json({ success: true, users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };


  exports.blockEducationUser= async (req, res) => {
    const { userId } = req.body;
  
    try {
      const users = await User.findById(userId);
  
      if (!users) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (users.status === 'block') {
        return res.status(400).json({ message: 'User is already block' });
      }
  
      users.status = 'block';
      await users.save();
  
      return res.status(200).json({ message: 'User block successfully!' });
    } catch (error) {
      console.error('Error activating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  exports.blockHealthcareUser= async (req, res) => {
    const { userId } = req.body;
  
    try {
      const users = await User.findById(userId);
  
      if (!users) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (users.status === 'block') {
        return res.status(400).json({ message: 'User is already block' });
      }
  
      users.status = 'block';
      await users.save();
  
      return res.status(200).json({ message: 'User block successfully!' });
    } catch (error) {
      console.error('Error activating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  



  exports.unblockEducationUser= async (req, res) => {
    const { userId } = req.body;
  
    try {
      const users = await User.findById(userId);
  
      if (!users) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (users.status === 'active') {
        return res.status(400).json({ message: 'User is already active' });
      }
  
      users.status = 'active';
      await users.save();
  
      return res.status(200).json({ message: 'User active successfully!' });
    } catch (error) {
      console.error('Error activating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  exports.unblockHealthcareUser= async (req, res) => {
    const { userId } = req.body;
  
    try {
      const users = await User.findById(userId);
  
      if (!users) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (users.status === 'active') {
        return res.status(400).json({ message: 'User is already active' });
      }
  
      users.status = 'active';
      await users.save();
  
      return res.status(200).json({ message: 'User block successfully!' });
    } catch (error) {
      console.error('Error activating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  
  
  