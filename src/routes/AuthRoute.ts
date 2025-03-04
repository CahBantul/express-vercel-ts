import { Router } from "express";
import { register, login } from "../contollers/AuthContoller";

const router = Router();

// Route untuk register user
router.post("/register", register);

// Route untuk login user
router.post("/login", login);

export default router;
