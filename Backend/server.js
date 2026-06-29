import "dotenv/config";
import express from "express";
import mongoose from 'mongoose';
import 'dotenv/config'
import { GoogleGenAI } from "@google/genai";
import getOpenAiAPIResponse from './utils/openai.js';
import chatRouter from './routes/chatRoute.js';



const app = express();
app.use(express.json());
const MongoUrl = process.env.MONGODB_URL;
const port = 5000;




// const test = async() => {
//   const response = await getOpenAiAPIResponse("What is React");
//   console.log(JSON.stringify(response.candidates[0].content.parts[0].text, null, 2));
// }

// test();




// const ai = new GoogleGenAI({
//   apiKey: process.env.MY_GEMINI_API_KEY,
// });

// app.post('/chat', async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await ai.models.generateContent({
//       model: 'gemini-3.1-flash-lite',
//       contents: prompt,
//     });

//     res.json({
//       success: true,
//       reply: response.text,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

app.use("/api", chatRouter);

const dB = async() => {
 try{
   await mongoose.connect(MongoUrl);
   console.log("Connected to Database!");

 } catch(err) {
      console.log("Database not Connected!", err);
 }
}





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  dB();
});