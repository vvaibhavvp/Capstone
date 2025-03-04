import express from "express";
import { SignUp, login} from "../controller/user_controller.js";
import { createCustomer, deleteCustomer, getAllCustomers, getCustomer, getDashboardStats, updateCustomer } from "../controller/admin_controller.js";
const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", login);

// Admin routes
// router.get("/all", isAuthenticated, isAdmin, getAllUsers);
// router.get("/dashboard", isAuthenticated, isAdmin, getDashboardStats);
// router.get("/:id", isAuthenticated, isAdmin, getUserById);
// router.put("/:id", isAuthenticated, isAdmin, updateUser);
// router.delete("/:id", isAuthenticated, isAdmin, deleteUser);

router.get("/dashboard", getDashboardStats)
router.get("/customers", getAllCustomers)
router.get("/customers/:id", getCustomer)
router.post("/customers", createCustomer)
router.put("/customers/:id", updateCustomer)
router.delete("/customers/:id", deleteCustomer)
export default router;