import { collection, addDoc, serverTimestamp, query, where, onSnapshot, updateDoc, arrayUnion, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Send a message
export async function sendMessage(sender: string, senderName: string, receiverId: string, receiverName: string, text: string) {
  if (!text.trim()) return;

  // await addDoc(collection(db, "messages"), {
  //   senderId: sender,
  //   senderName,
  //   receiverId,
  //   text,
  //   timestamp: serverTimestamp(),
  // });

  const participants = [sender, receiverId].sort(); 
  // sort ensures consistent order: ["A","B"] not ["B","A"]

  // 🔎 Check if conversation already exists
  const q = query(
    collection(db, "messages"),
    where("participants", "==", participants)
  );


    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // ✅ Conversation exists → Update existing doc
      const docRef = querySnapshot.docs[0].ref;

      await updateDoc(docRef, {
        texts: arrayUnion({
          text,
          sender,
          senderName,
          isSeen: false,
          timestamp: Date.now()
        }),
      });
    } else {
      // ❌ Conversation doesn't exist → Create new doc
      await addDoc(collection(db, "messages"), {
        participants,
        senderName,
        receiverName,
        texts: [
          {
            text,
            sender,
            senderName,
            isSeen: false,
            timestamp: Date.now()
          },
        ],
      });
    }
}


export function listenToMessages(receiverId: string, callback: any) {
  // const q = query(
  //   collection(db, "messages"),
  //   where("receiverId", "==", receiverId),
  // );

    const q = query(
    collection(db, "messages"),
    where("participants", "array-contains", receiverId)  // ✅ checks if userId is in participants array
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
}


export async function markMessagesAsSeen(docId: string, senderId: string) {
  try {
    const docRef = doc(db, "messages", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const updatedTexts = data.texts.map((msg: any) => {
        if (msg.sender !== senderId) {
          return { ...msg, isSeen: true };
        }
        return msg;
      });

      await updateDoc(docRef, { texts: updatedTexts });
      console.log("Messages marked as seen!");
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error updating messages: ", error);
  }
}
