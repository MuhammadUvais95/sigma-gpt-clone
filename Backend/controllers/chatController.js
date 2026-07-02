import Thread from '../models/Thread.js';
import getOpenAiAPIResponse from '../utils/openai.js';

export const getAllChats = async(req, res) => {
  const threads = await Thread.find({}).sort({updatedAt: -1});  // decreasing order
  res.json(threads);
}



export const getOneChat = async(req, res) => {
    const{ threadId} = req.params;
    try{
      const thread = await Thread.findOne({threadId});   // findById works for mongodb's _id
      if(!thread) {
        return res.status(404).json({error: "This thread does not exist!"});
      }
      return res.status(200).json({success: true, content: thread.messages});
    } catch(err) {
        console.log("Error is ::", err);
        return res.status(500).json({message: "Internal Server Error:", error: err.message, success:false});
    }
}


export const deleteChat = async(req, res) => {
    const { threadId} = req.params;
    try{
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            return res.status(404).json({message: "Thread does not exist which do you want to delete!"});
        }
         return res.status(200).json({message: "Thread deleted successfully!"});
        

    } catch(err) {
        console.log("Error is ::", err);
        return res.status(500).json({message: "Internal Server error", error: err.message, success: false});
    }
}



export const gettingResponse = async(req, res) => {
    const{ threadId, message} = req.body;
    try{
        if(!threadId || !message){
            return res.status(400).json({error: "missing required fields!"});
        }
        let thread = await Thread.findOne({threadId});
        // console.log(thread.messages[thread.messages.length - 1].content);
        if(!thread){
            // if thread does not exist then create new thread here
            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message}]
            })
        } else{
            thread.messages.push({ role: "user", content: message});
        }
        const assistantReply = await getOpenAiAPIResponse(message);
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = Date.now();
        await thread.save();
        return res.json({reply: assistantReply})
        
    }catch(err) {
        console.log("Error is::", err);
        return res.status(500).json({error: "Internal Server error"})
    }
}