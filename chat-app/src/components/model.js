import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDoJRHxY5fzQyNWanYe2XlEeZsYbnaxkRA");

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

