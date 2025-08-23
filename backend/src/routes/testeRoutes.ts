import { Router } from "express";
import { testeController } from "../controllers/testeController";


const router = Router();

router.get("/", testeController.getAll);
router.post("/", testeController.setTeste);

export default router;