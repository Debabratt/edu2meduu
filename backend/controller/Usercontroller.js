const bcrypt = require("bcrypt");
const User = require("../model/User");
const Category = require("../model/Category");
const Contact = require("../model/Contact");
const fs = require('fs');
const multer = require('multer');
const path=require("path")
// Register User Controller
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, userType, category, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phone || !userType) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Validate category based on userType
    const validCategories = {
      education: [
        "Day School",
        "Boarding School",
        "Play School",
        "Private Tutor",
        "Coaching Centre",
      ],
      healthcare: ["Hospital", "Private Clinic", "Medical Stores"],
    };

    if (
      (userType === "education" || userType === "healthcare") &&
      !validCategories[userType].includes(category)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid category for the selected userType" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
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
      category:
        userType === "education" || userType === "healthcare"
          ? category
          : undefined,
      role: role || "user",
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User Controller
exports.loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password, userType } = req.body; // Identifier can be email or phone

    // Find user by email or phone number
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      userType,
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email/phone or password" });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email/phone or password" });
    }

    // Exclude password before sending response
    const { password: _, ...userData } = user.toObject();

    res.json({ success: true, message: "Login successful", user: userData });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getEducationUsers = async (req, res) => {
  try {
    const educationUsers = await User.find({ userType: "education" });

    if (!educationUsers.length) {
      return res
        .status(404)
        .json({ success: false, message: "No education users found" });
    }

    // ✅ Base URL for images
    const baseUrl = `${req.protocol}://${req.get("host")}/`;

    // ✅ Update image URLs for each user
    const updatedUsers = educationUsers.map(user => ({
      ...user._doc,
      image: user.image ? `${baseUrl}${user.image}` : "/default-image.png"
    }));

    res.status(200).json({ success: true, users: updatedUsers });
  } catch (error) {
    console.error("Error fetching education users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


exports.getHealthcareUsers = async (req, res) => {
  try {
    // ✅ Fetch users where userType is 'education'
    const users = await User.find({ userType: "healthcare" });

    // ✅ Base URL setup dynamically
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // ✅ Corrected mapping of user data to include full image URL
    const updatedUsers = users.map((item) => ({
      ...item._doc,
      image: item.image ? `${baseUrl}${item.image}` : "/default-image.png",
    }));

    // ✅ Send the updated users list
    res.status(200).json({ success: true, users: updatedUsers });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Server error" });
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

exports.getAllUsers = async (req, res) => {
  try {
    // ✅ Fetch users where userType is 'education'
    const users = await User.find({ userType: "education" });

    // ✅ Base URL setup dynamically
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    // ✅ Corrected mapping of user data to include full image URL
    const updatedUsers = users.map((item) => ({
      ...item._doc,
      image: item.image ? `${baseUrl}${item.image}` : "/default-image.png",
    }));

    // ✅ Send the updated users list
    res.status(200).json({ success: true, users: updatedUsers });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Handle new contact form submission
exports.requestCall = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, phone });
    await newContact.save();

    res
      .status(201)
      .json({
        message:
          "Thank you for reaching out! Our team will get back to you soon.",
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};




//update profile


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create uploads directory if it doesn't exist
        
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp","image/avif"];
      if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
      } else {
          cb(new Error("Invalid file type. Only JPEG, PNG, GIF,AVIF, and WebP are allowed."), false);
      }
  }
});






exports.updateProfile = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ success: false, message: "File upload failed" });
    }

    try {
     

      const userId = req.body.userId; // Get user ID from request body

      if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }

      const updateFields = { ...req.body };

      if (req.file) {
        updateFields.image = `/uploads/${req.file.filename}`;
      }

      // Remove empty fields
      Object.keys(updateFields).forEach((key) => {
        if (!updateFields[key]) {
          delete updateFields[key];
        }
      });

      console.log("Fields to update:", updateFields);

      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { 
        new: true, 
        runValidators: true 
      });

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });
};

