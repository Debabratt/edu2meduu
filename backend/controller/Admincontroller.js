

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


  exports.blockInstitution = async (req, res) => {
    try {
      const { id } = req.params; // ID of the institution
      const { status } = req.body; // Block status (true or false)
  
      // Find and update the institution's blocked status
      const institution = await User.findByIdAndUpdate(
        id,
        { isBlocked: status },
        { new: true }
      );
  
      if (!institution) {
        return res.status(404).json({ success: false, message: "Institution not found" });
      }
  
      res.status(200).json({
        success: true,
        message: `Institution ${status ? "blocked" : "unblocked"} successfully. Blocked institutions cannot add categories.`,
        institution,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  


  
  
  