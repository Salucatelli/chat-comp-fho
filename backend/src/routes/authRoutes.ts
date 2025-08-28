import { Router } from "express";
import { login, register } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";


const router = Router();

router.post("/register", register);
router.post("/login", login);

// Teste de rota protegida
router.get("/profile", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Autenticado com sucesso!", user: (req as any).user });
})

export default router;