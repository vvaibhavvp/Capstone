import express from "express";
import { SignUp, login} from "../controller/user_controller.js";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", login);

export default router;