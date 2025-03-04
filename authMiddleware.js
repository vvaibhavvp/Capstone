import User from "../models/user_model.js";

export const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user || user.role !== "Admin") {
            return res.status(403).json({ message: "Access Denied: Admins Only" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
