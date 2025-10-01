import { collection, addDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

// Send a message
export async function sendMessage(sender: string, senderName: string, receiverId: string, text: string) {
  if (!text.trim()) return;

  await addDoc(collection(db, "messages"), {
    senderId: sender,
    senderName,
    receiverId,
    text,
    timestamp: serverTimestamp(),
  });
}

// Listen for messages between 2 users
export function listenToMessages(receiverId: string, callback: any) {
  const q = query(
    collection(db, "messages"),
    where("receiverId", "==", receiverId),
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
}
