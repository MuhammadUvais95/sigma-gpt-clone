import express from 'express'
import {getAllChats, getOneChat, deleteChat, gettingResponse} from '../controllers/chatController.js';
import Thread from '../models/Thread.js';
const router = express.Router();



router.get("/thread", getAllChats);


router.get("/thread/:threadId", getOneChat);


router.delete("/thread/:threadId", deleteChat);


router.post("/chat", gettingResponse);







router.get("/test", async(req, res) => {
    try{
         const thread = new Thread({
        threadId: "Uvais123456",
        title: "What is Python",
        messages: [{
            role: "user",
            content: "Library of python"
        }]
    })
        await thread.save();
        return res.status(201).json({message: "new thread created successfully!", thread})
    }catch(err) {
      console.log("error is ::", err);
    }
   
})





export default router;