
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const fetchMessage = async (chatID, numMessages = 70) => {
  try {
    const messagesRef = collection(db,'chats',chatID,'messages');
    const q = query(messagesRef, orderBy("timestamp", "desc"), limit(numMessages));

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      sender: doc.data().sender || "Unknown", 
      text: doc.data().text || "", 
    })).reverse();
  } 
  catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export default fetchMessage;