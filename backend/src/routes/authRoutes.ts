import { Router } from "express";
import { login, register } from "../controllers/authController";
import { getProfile } from "../controllers/profileController";
import { authenticateToken as authenticationMiddleware } from "../middleware/authMiddleware";


const router = Router();

router.post("/register", register);
router.post("/login", login);

// Rota para retornar o perfil
router.get("/profile", authenticationMiddleware, getProfile);

export default router;