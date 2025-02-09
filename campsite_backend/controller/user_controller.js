import User from "../models/user_model.js";
import bcryptjs from "bcryptjs";

export const SignUp = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const user = await User.findOne({ email });
        if(user){
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
    }catch(error){
        console.log("Error:" + error.message);
        res.status(500).json({message: "Internal server error"});
    }
};

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};