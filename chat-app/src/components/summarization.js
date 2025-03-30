import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDoJRHxY5fzQyNWanYe2XlEeZsYbnaxkRA");

export const summarization = async (chatHistory) => {
  try {
    const formattedChat = chatHistory.map(msg => `${msg.sender}: ${msg.text}`).join("\n");
    if(!formattedChat) return 'No chat found. Please start the conversation to get summary.'
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    console.log(chatHistory)
    const prompt = `Summarize this chat conversation completely also include the name of people who are talking: ${formattedChat}`;

    const response = await model.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary.";
  }
};
