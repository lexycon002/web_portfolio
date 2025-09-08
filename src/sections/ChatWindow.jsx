// import { useState } from "react";
// import axios from "axios";

// export default function ChatWindow({ onClose }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = async () => {
//     if (!input) return;

//     const userMsg = { role: "user", content: input };
//     setMessages([...messages, userMsg]);
//     setInput("");

//     try {
//       const res = await axios.post("http://localhost:5000/chat", {
//         messages: [...messages, userMsg],
//       });
//       setMessages((prev) => [...prev, { role: "bot", content: res.data.reply }]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [...prev, { role: "bot", content: "Error: Try again." }]);
//     }
//   };

//   return (
//     <div className="fixed bottom-20 right-6 w-80 h-96 bg-white dark:bg-gray-800 shadow-2xl rounded-xl flex flex-col z-50">
//       <div className="flex justify-between items-center bg-indigo-500 text-white p-3 rounded-t-xl">
//         <h3>Chatbot</h3>
//         <button onClick={onClose}>✕</button>
//       </div>
//       <div className="flex-1 p-3 overflow-y-auto space-y-2">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded-lg ${
//               msg.role === "user" ? "bg-indigo-100 text-indigo-900 self-end" : "bg-gray-200 dark:bg-gray-700"
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}
//       </div>
//       <div className="flex p-2 gap-2 border-t border-gray-300 dark:border-gray-600">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none"
//         />
//         <button onClick={handleSend} className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 rounded-lg">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
