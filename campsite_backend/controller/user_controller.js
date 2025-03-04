import User from "../models/user_model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const SignUp = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Check if passwords match
        // if (password !== confirmPassword) {
        //     return res.status(400).json({ message: "Passwords do not match" });
        // }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            username: username,
            email: email,
            password: hashPassword,
        });

        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Ensure passwords match before checking the database
        // if (password !== confirmPassword) {
        //     return res.status(400).json({ message: "Passwords do not match!" });
        // }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username, // Fixed fullname to username
                email: user.email,
            },
        });

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


// from here forgot password code

const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use Gmail's SMTP service
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address (e.g., 'your-email@gmail.com')
        pass: process.env.EMAIL_PASS, // Your Gmail password or an App Password
    },
    tls: {
        rejectUnauthorized: false,  // To allow self-signed certs, if applicable
    },
});

// Forgot Password - Step 1: Generate Reset Token and Send Email
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

        await user.save();

        // Send email with reset link
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error details:", err);  // Detailed error log
                return res.status(500).json({ message: "Error sending email" });
            }
            return res.status(200).json({ message: "Reset link sent to email" });
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Reset Password - Step 2: Verify Token and Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;

        console.log("Received Token:", token);

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }

        // Find user by reset token
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.status(200).json({ message: "Password has been successfully reset" });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};