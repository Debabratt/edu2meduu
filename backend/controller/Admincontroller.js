

const Admin=require('../model/Admin');
const User = require('../model/User');
const multer = require('multer');
const News = require("../model/News");
const fs = require('fs');
const Category=require('../model/Category')
const path=require("path")
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





  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create uploads directory if it doesn't exist
        
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

exports.addCategory = (req, res) => {
    upload.single("image")(req, res, async (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(500).json({ 
                success: false, 
                message: "File upload failed" 
            });
        }

        const { name, ctitle, categoryType } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!name || !ctitle || !categoryType || !image) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        try {
            const newCategory = new Category({
                name,
                ctitle,
                categoryType,
                image,
            });

            await newCategory.save();
            res.status(201).json({ 
                success: true, 
                message: "Category added successfully", 
                category: newCategory 
            });
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ 
                success: false, 
                message: "Failed to add category" 
            });
        }
    });
};


  
  
  

  

// Create News
exports.createNews = async (req, res) => {
  try {
    const { title, content, image, category, createdBy } = req.body;

    if (!title || !content || !category || !createdBy) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const news = new News({ title, content, image, category, createdBy });
    await news.save();
    res.status(201).json({ message: "News posted successfully", news });
  } catch (error) {
    res.status(500).json({ message: "Error creating news", error });
  }
};

// Get All News
exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().populate("createdBy", "name email");
    res.status(200).json(newsList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// Get Single News
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
};

// Delete News
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting news", error });
  }
};
