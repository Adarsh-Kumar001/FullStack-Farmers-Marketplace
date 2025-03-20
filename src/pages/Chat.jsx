import { app } from '../FirebaseConnect';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { useRef } from 'react';

const Chat = ({user}) => {
 const db = getFirestore(app);
 const { emailid } = useParams();
  const receiverEmail = decodeURIComponent(emailid);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null); // For auto-scrolling

  useEffect(() => {
    if (!user) return; 

    const chatID = [user.email, receiverEmail].sort().join("_");
    const messagesRef = collection(db, "chats", chatID, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user, receiverEmail]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!user || newMessage.trim() === "") return;

    const chatID = [user.email, receiverEmail].sort().join("_");
    await addDoc(collection(db, "chats", chatID, "messages"), {
      sender: user.email,
      receiver: receiverEmail,
      text: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  if (!user) {
    return <p className="text-center text-gray-500 mt-5">Loading...</p>;
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-center font-semibold rounded-t-lg pt-3">
        Chat with {receiverEmail}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === user.email ? "items-end" : "items-start"}`}>
            <p className="text-xs text-gray-500">{msg.sender === user.email ? "You" : msg.sender}</p>
            <div className={`p-2 max-w-xs rounded-lg text-white ${msg.sender === user.email ? "bg-blue-500" : "bg-gray-600"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex p-3 border-t bg-white">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};


export default Chat