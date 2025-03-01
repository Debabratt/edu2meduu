const User = require('../model/User');
const crypto = require('crypto');
const { sendEmail } = require('../utils/nodemailer');

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes
        await user.save();

        const resetURL = `http://localhost:3000/reset-password/${token}`;
        sendEmail(email, 'Password Reset Request', `Click the link to reset your password: ${resetURL}`);

        return res.status(200).json({ message: 'Reset link sent to your email' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = newPassword; // Hashing should be done before saving
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
