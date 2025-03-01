
const express = require("express");
const AuthRouter = express.Router();

// ✅ Session Check Route
AuthRouter.get("/check-session", (req, res) => {
  console.log("Session Data:", req.session); // Debug ke liye

  if (req.session && req.session.user) {
    return res.json({
      success: true,
      user: req.session.user,
    });
  } else {
    return res.json({ success: false, message: "No active session" });
  }
});

module.exports = AuthRouter;








//const express = require('express');
// // const { forgotPassword, resetPassword } = require('../controller/Forgotpassword');

// // const AuthRouter = express.Router();

// // AuthRouter.post('/forgot-password', forgotPassword);
// // AuthRouter.post('/reset-password/:token', resetPassword);

// // module.exports = AuthRouter;
