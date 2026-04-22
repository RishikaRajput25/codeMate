
/*
import { GoogleGenerativeAI } from "@google/generative-ai";


const API_KEY = "AIzaSyDviid_yDSMcxneUu5qB8wZlweKqJu09c4";
async function testGemini() {
  try {
    
    const genAI = new GoogleGenerativeAI( API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = "Explain MERN stack in 5 lines";

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    console.log("\nGemini Response:\n");
    console.log(response);

  } catch (error) {
    console.error("Error:", error);
  }
}

testGemini();
*/