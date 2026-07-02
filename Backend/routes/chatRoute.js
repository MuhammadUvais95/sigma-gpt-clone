import express from 'express'
import {getAllChats, getOneChat, deleteChat, gettingResponse} from '../controllers/chatController.js';
import Thread from '../models/Thread.js';
const router = express.Router();



router.get("/thread", getAllChats);


router.get("/thread/:threadId", getOneChat);


router.delete("/thread/:threadId", deleteChat);


router.post("/chat", gettingResponse);




export default router;