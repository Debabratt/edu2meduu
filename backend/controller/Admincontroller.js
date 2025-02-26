

const Admin=require('../model/Admin');
const User = require('../model/User');
const multer = require('multer');
const News = require("../model/News");
const fs = require('fs');
const Category=require('../model/Category')
const Contact=require('../model/Contact')
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

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
      } else {
          cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."), false);
      }
  }
});




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
        const image = req.file ? `uploads/${req.file.filename}` : null;  

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
exports.createNews = (req, res) => {
  upload.single("image")(req, res, async (err) => {
      if (err) {
          console.error("File upload error:", err);
          return res.status(500).json({
              success: false,
              message: "File upload failed"
          });
      }

      const { title, content, moreContent } = req.body;
      const image = req.file ? `uploads/${req.file.filename}` : null;

      // ✅ Correct the validation check
      if (!title || !content || !moreContent || !image) {
          return res.status(400).json({
              success: false,
              message: "All fields including the image are required"
          });
      }

      try {
          const news = new News({
              title,
              content,
              moreContent,
              image, // ✅ Save only the image path, not `req.body.newsImage`
          });

          await news.save();
          res.status(201).json({
              success: true,
              message: "News added successfully",
              news
          });
      } catch (error) {
          console.error("Database error:", error);
          res.status(500).json({
              success: false,
              message: "Failed to add news"
          });
      }
  });
};








exports.getAllNews = async (req, res) => {
  try {
      const news = await News.find().sort({ createdAt: -1 });

      if (!news.length) {
          return res.status(404).json({
              success: false,
              message: "No news articles found"
          });
      }

      // ✅ Base URL add karne ke liye
      const baseUrl = `${req.protocol}://${req.get("host")}/`;
      const updatedNews = news.map(item => ({
          ...item._doc,
          image: item.image ? `${baseUrl}${item.image}` : "/default-image.png"
      }));

      res.status(200).json({
          success: true,
          message: "News articles retrieved successfully",
          news: updatedNews
      });
  } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
          success: false,
          message: "Failed to retrieve news"
      });
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


// Fetch all contact submissions (for admin)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};
