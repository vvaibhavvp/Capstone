import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String, 
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    resetToken: {  // 🔹 New Field for Forgot Password
        type: String,
        default: null
    },
    resetTokenExpiry: {  // 🔹 New Field for Token Expiry
        type: Date,
        default: null
    }
});

const User = mongoose.model("User", UserSchema);
export default User;