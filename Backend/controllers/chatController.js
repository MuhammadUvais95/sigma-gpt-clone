import Thread from '../models/Thread.js';


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