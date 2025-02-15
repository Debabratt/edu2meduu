const bcrypt = require('bcrypt');
const User = require('../model/User'); // Correct model import
const Admin=require('../model/Admin')
// Register User Controller
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, userType, category, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone || !userType) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Validate category based on userType
    const validCategories = {
      education: ['Day School', 'Boarding School', 'Play School', 'Private Tutor', 'Coaching Centre'],
      healthcare: ['Hospital', 'Private Clinic', 'Medical Stores'],
    };

    if ((userType === 'education' || userType === 'healthcare') && !validCategories[userType].includes(category)) {
      return res.status(400).json({ message: 'Invalid category for the selected userType' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      userType,
      category: userType === 'education' || userType === 'healthcare' ? category : undefined,
      role: role || 'user',
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User Controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password,userType } = req.body; // Add usertype from the request body
    console.log(email,password,userType)
    // Find user by email
    const user = await User.findOne({ email,userType});
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    
    // If login is successful, return the user data
    res.json({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



exports.adminLogin = async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    console.log(email, password, userType);

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




