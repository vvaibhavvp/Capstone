// import express from "express";
// import { SignUp, login} from "../controller/user_controller.js";
// const router = express.Router();

// router.post("/signup", SignUp);
// router.post("/login", login);

// export default router;

import express from "express";
import { SignUp, login, forgotPassword, resetPassword } from "../controller/user_controller.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);  // Forgot password route
router.post("/reset-password", resetPassword);  // Reset password route

export default router;
