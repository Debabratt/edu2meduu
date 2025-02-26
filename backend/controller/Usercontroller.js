const bcrypt = require('bcrypt');
const User = require('../model/User'); 
const Category = require("../model/Category");
const Contact =require('../model/Contact')

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

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};








// Handle new contact form submission
exports.requestCall = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, phone});
    await newContact.save();

    res.status(201).json({ message: "Thank you for reaching out! Our team will get back to you soon." });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

