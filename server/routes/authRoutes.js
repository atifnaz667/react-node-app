import express from "express";
import { register, login, getMe, logout } from "../controllers/UserController.js";
import { validateRegister, validateLogin, handleValidationErrors } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, handleValidationErrors, register);
router.post("/login", validateLogin, handleValidationErrors, login);
router.get("/me", getMe);
router.post("/logout", logout);

export default router;