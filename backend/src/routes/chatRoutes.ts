import { Router } from "express";
import { getAllContacts, sendMessage, getAllConversations, createConversation } from "../controllers/chatController";

const router = Router();

router.get("/allContacts", getAllContacts);
router.get("/conversations/:userId", getAllConversations);

router.post("/sendMessage", sendMessage);
router.post("/createConversation", createConversation);

export default router;