import  'dotenv/config';
import {GoogleGenAI} from '@google/genai';



const getOpenAiAPIResponse = async (message) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.MY_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  // convert to JS -> json 
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json(); // convert to json -> JS object
    console.log(data);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (err) {
    console.error(err);
  }
};




export default getOpenAiAPIResponse;