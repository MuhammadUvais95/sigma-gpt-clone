import express from 'express'
import {getAllChats, getOneChat, deleteChat} from '../controllers/chatController.js';
const router = express.Router();



router.get("/thread", getAllChats);




router.get("/thread/:threadId", getOneChat);



router.delete("/thread/:threadId", deleteChat);


router.post("/test", async(req,res) => {
    try{
        const newChat =   await new Thread({
            threadId: Date.now(),
        title: "Gemini",
        messages: [
            {
                role: "user",
                content: "What is Node.js"
            }
        ]

    })
    const data = await newChat.save();
    res.status(200).json(newChat);
    console.log("newchat is ::", newChat);
    } catch(err) {
        console.log("Error is ::", err);
    }
} )

export default router;