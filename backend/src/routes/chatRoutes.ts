import { Router } from "express";
import { getAllContacts, sendMessage, getAllConversations, createConversation, getAllMessagesFromConversation, setmessageAsRead } from "../controllers/chatController";

const router = Router();

router.get("/allContacts", getAllContacts);
router.get("/conversations/:userId", getAllConversations);
router.get("/getMessages/:conversationId", getAllMessagesFromConversation);

router.post("/sendMessage", sendMessage);
router.post("/createConversation", createConversation);
router.post("/setMessageAsRead", setmessageAsRead);


export default router;