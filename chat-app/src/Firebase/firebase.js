import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { collection, getDoc, getFirestore, onSnapshot, doc, setDoc, serverTimestamp, updateDoc, addDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCGrEhXx1yPjHXwwS9c6aqx4IAi6Jfgmts",
    authDomain: "gupshup-a058d.firebaseapp.com",
    projectId: "gupshup-a058d",
    storageBucket: "gupshup-a058d.firebasestorage.app",
    messagingSenderId: "666026331211",
    appId: "1:666026331211:web:c471dff8244d80a57551ce"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const listenForChats = (setChats) => {
    const chatsRef = collection(db, 'chats');
    const unsubscribe = onSnapshot(chatsRef, (snapshot) => {
        const chatList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const filteredChats = chatList.filter((chat) => chat?.users?.some((user) => user.email === auth.currentUser.email));
        setChats(filteredChats);
    });

    return unsubscribe; // returning this unsubscribe for clean up
}

export const sendMessage = async (messageText, chatID, user1, user2) => {
   
    const chatRef = doc(db, "chats", chatID);
    console.log(chatRef);

    const user1Doc = await getDoc(doc(db, 'users', user1?.uid));
    const user2Doc = await getDoc(doc(db, 'users', user2?.uid));


    if (!user1Doc.exists() || !user2Doc.exists()) {
        console.error("User documents not found"); // Log an error if user documents are missing
        return; // Exit the function if user documents are not found
    }

    const user1Data = user1Doc.data();
    const user2Data = user2Doc.data();

    const chatDoc = await getDoc(chatRef);
    if (!chatDoc.exists) {
        console.log('chats collection created ');
        await setDoc(chatRef, {
            
            users: [user1Data, user2Data],
            lastMessage: messageText,
            lastMessageTimestamp: serverTimestamp(),
        })
    }
    else {
        await updateDoc(chatRef, {
            lastMessage: messageText,
            lastMessageTimestamp: serverTimestamp(),
        });
    }
    const messageRef = collection(db, 'chats', chatID, 'messages');

    await addDoc(messageRef, {
        text: messageText,
        sender: auth.currentUser.email,
        timestamp: serverTimestamp(),
    });

}

export { auth, db };
