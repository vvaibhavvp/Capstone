import User from "../models/user_model.js";
import bcryptjs from "bcryptjs";

export const SignUp = async (req, res) => {
    try {
        const { username, email, password, role } = req.body; // ✅ Include role
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            username: username, 
            email: email, 
            password: hashPassword,
            role: role || "User", // ✅ Default role is "User" if not provided
        });

        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
                role: createdUser.role, // ✅ Send role in response
            },
        });
    } catch (error) {
        console.log("Error:" + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role  // ✅ Add role here
            },
        });
        }
     catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Admin functions
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "User" }).select("-password");
        res.status(200).json({ users });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username, email, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, role },
            { new: true }
        ).select("-password");
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ 
            message: "User updated successfully", 
            user: updatedUser 
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments({ role: "User" });
        
        // You can add more stats here as needed
        const stats = {
            userCount,
            // Add more stats like bookings, revenue, etc.
        };
        
        res.status(200).json({ stats });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

