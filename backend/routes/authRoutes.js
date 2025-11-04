import express from "express";
import { registerUser, loginUser, getUserById, updateUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/registro", registerUser);
router.post("/login", loginUser);

// NUEVAS RUTAS
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
