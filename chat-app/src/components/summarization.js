

import { model } from "../components/model";
export const summarization = async (chatHistory) => {
  try {
    const formattedChat = chatHistory.map(msg => `${msg.sender}: ${msg.text}`).join("\n");
    if(!formattedChat) return 'No chat found. Please start the conversation to get summary.'
    console.log(chatHistory)
    const prompt = `Summarize this chat conversation completely also include the name of people who are talking: ${formattedChat}`;

    const response = await model.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary.";
  }
};
