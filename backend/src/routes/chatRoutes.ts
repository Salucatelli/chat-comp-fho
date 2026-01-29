import { Router } from "express";
import { getAllContacts, sendMessage } from "../controllers/chatController";

const router = Router();

router.get("/allContacts", getAllContacts);
router.post("/sendMessage", sendMessage);

export default router;