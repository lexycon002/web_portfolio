import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaTerminal, FaTimes, FaExpand, FaMinus } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// --- API URL Configuration ---
// If we are in production (on Vercel), use a relative path.
// If we are local, use the localhost URL.
const API_URL = import.meta.env.MODE === 'production' ? "" : (import.meta.env.VITE_API_URL || "http://localhost:5000/api");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ChatWindow({ onClose, onAction }) {
  const [flowState, setFlowState] = useState('MENU');
  const [commandType, setCommandType] = useState(null);
  const [userName, setUserName] = useState("");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  
  const messagesContainerRef = useRef(null);

  const typeBotResponse = async (text, speed = 30) => {
    setIsTyping(true);
    setMessages(prev => [...prev, { role: "bot", content: "" }]);

    for (let char of text) {
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        lastMsg.content += char;
        return newMsgs;
      });
      await delay(speed);
    }
    setIsTyping(false);
  };

  useEffect(() => {
    const runBootSequence = async () => {
      setIsTyping(true);
      setMessages([{ role: "bot", content: "" }]);

      const systemLines = [
        "> SYSTEM_BOOT_SEQUENCE_INITIATED...",
        `> USER_IDENTITY: ${userName || 'UNKNOWN'}`,
        "> CONNECTION: SECURE",
        "\n"
      ];
      
      const welcomeText = `**Hi, I'm Hammad's AI Assistant.**\n\nSelect an option to begin:\n\n**[1]** Perform Advanced Arithmetics\n\n**[2]** Determine Current Location\n\n**[3]** Switch Portfolio Mode\n\n(Type the number **1**, **2**, or **3**)\nType 'clear' to restart. Type 'exit' to close.\n`;

      const appendText = (char) => {
        setMessages((prev) => {
          const newMsgs = [...prev];
          const newMsg = newMsgs[newMsgs.length - 1];
          newMsg.content += char;
          return newMsgs;
        });
      };

      for (let line of systemLines) {
        for (let char of line) { appendText(char); await delay(10); }
        appendText("\n"); 
      }
      for (let char of welcomeText) { appendText(char); await delay(25); }

      setIsTyping(false);
    };

    runBootSequence();
  }, []); 

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleLocationRequest = async () => {
    await typeBotResponse("> INITIALIZING SATELLITE UPLINK...\n> REQUESTING PERMISSION...", 20);
    if (!navigator.geolocation) {
        await typeBotResponse("> ERROR: GEOLOCATION NOT SUPPORTED.", 30);
        return;
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await typeBotResponse(`> COORDINATES ACQUIRED: [${latitude.toFixed(4)}, ${longitude.toFixed(4)}]\n> RESOLVING ADDRESS...`, 20);
            try {
                const res = await axios.post(`${API_URL}/api/chat`, {
                    message: "What is my location?", 
                    location: { latitude, longitude }
                });
                await typeBotResponse(res.data.reply, 30);
            } catch (e) {
                await typeBotResponse("> ERROR: SERVICE UNREACHABLE.", 30);
            }
        },
        async () => await typeBotResponse("> ERROR: PERMISSION DENIED.", 30)
    );
  };

  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      typeBotResponse(`> NAVIGATING TO ${sectionId.toUpperCase()}...`, 20);
      if (window.innerWidth < 768) setTimeout(() => setIsMinimized(true), 800);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userText = input;
    const lowerText = userText.toLowerCase().trim();

    if (lowerText === "exit") { onClose(); return; }
    if (lowerText === "clear") {
        setMessages([]); setFlowState('MENU'); setCommandType(null); setInput("");
        return;
    }

    setMessages(prev => [...prev, { role: "user", content: userText }]);
    setInput("");

    // --- MENU LOGIC ---
    if (flowState === 'MENU') {
        if (lowerText === "1") {
            setFlowState('ARITHMETIC_MODE');
            setTimeout(() => typeBotResponse("> ARITHMETIC MODULE LOADED.\n> Enter your calculation:"), 500);
            return;
        }
        if (lowerText === "2") {
            handleLocationRequest();
            return;
        }
        if (lowerText === "3") {
            setCommandType('SWITCH');
            setFlowState('ASK_NAME');
            setTimeout(() => typeBotResponse("> AUTHENTICATION REQUIRED (ADMIN).\n> PLEASE ENTER YOUR NAME:"), 500);
            return;
        }
    }

    // --- NAME FLOW ---
    if (flowState === 'ASK_NAME') {
      setUserName(userText);
      setFlowState('CONFIRM_PROCESS');
      setTimeout(() => typeBotResponse(`> IDENTITY VERIFIED: **${userText}**\n\n> PROCEED WITH LAYOUT RECONFIGURATION? (YES/NO)`), 500);
      return;
    }

    // --- CONFIRMATION FLOW ---
    if (flowState === 'CONFIRM_PROCESS') {
      if (lowerText === "yes" || lowerText === "y") {
        setFlowState('NAV_MENU');
        if (commandType === 'SWITCH') {
            onAction({ type: "LAYOUT_SWITCH", layout: "frontend" });
            setTimeout(() => typeBotResponse(`> ACCESS GRANTED. SYSTEM RECONFIGURED.\n> 4 SECURE MODULES LOADED: [SKILLS, PROJECTS, BLOG, CONTACT]`), 500);
        }
      } else {
        setFlowState('MENU');
        setTimeout(() => typeBotResponse(`> ABORTED. RETURNING TO MAIN MENU.`), 500);
      }
      return;
    }

    // --- ARITHMETIC / FALLBACK ---
    setIsTyping(true);
    try {
      const res = await axios.post(`${API_URL}/api/chat`, { message: userText, history: messages });
      setIsTyping(false);
      await typeBotResponse(res.data.reply, 30);
    } catch (err) {
      setIsTyping(false);
      await typeBotResponse("> SYSTEM OFFLINE.", 30);
    }
  };

  // Logic to show 4 items if switched, 6 items if default
  const menuItems = commandType === 'SWITCH' 
    ? ['Skills', 'Projects', 'Blog', 'Contact'] 
    : ['Home', 'About', 'Skills', 'Projects', 'Blog', 'Contact'];

  return (
    <div className={`fixed w-96 right-1 bottom-12 md:w-96 z-[100] bg-black text-green-500 font-mono shadow-2xl rounded-lg overflow-hidden border border-green-800 transition-all ${isMinimized ? 'h-10' : 'h-[600px]'}`}>
      <div className="h-10 bg-gray-900 flex items-center justify-between px-3 border-b border-green-800 cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-2 text-xs font-bold"><FaTerminal /><span>root@hammad-portfolio:~</span></div>
        <div className="flex items-center gap-3">
            <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>{isMinimized ? <FaExpand size={12}/> : <FaMinus size={12}/>}</button>
            <button onClick={onClose}><FaTimes size={14} /></button>
        </div>
      </div>

      {!isMinimized && (
        <div className="absolute top-10 bottom-0 left-0 right-0 flex flex-col bg-black">
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
                {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "text-white" : "text-green-500"}`}>
                    <span className="shrink-0 opacity-50">{msg.role === "user" ? "$" : ">"}</span>
                    <div className="break-words max-w-full">
                        <ReactMarkdown 
                            children={msg.content} 
                            remarkPlugins={[remarkMath]} 
                            rehypePlugins={[rehypeKatex]}
                            components={{
                                p: ({node, ...props}) => <p className="mb-2" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold text-green-300" {...props} />
                            }}
                        />
                        {isTyping && i === messages.length - 1 && msg.role === "bot" && <span className="animate-pulse inline-block w-2 h-4 bg-green-500 ml-1"></span>}
                    </div>
                </div>
                ))}
                {flowState === 'NAV_MENU' && !isTyping && (
                <div className="grid grid-cols-2 gap-2 mt-4 border-t border-green-900 pt-4">
                    {menuItems.map((item) => (
                        <button key={item} onClick={() => handleNavigation(item.toLowerCase())} className="bg-green-900/20 border border-green-700 hover:bg-green-700 text-green-400 hover:text-white py-2 text-[10px] rounded uppercase transition-all">[{item}]</button>
                    ))}
                </div>
                )}
            </div>
            
            <div className="p-3 bg-black border-t border-green-800 shrink-0">
                <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold animate-pulse">_</span>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={isTyping} 
                    placeholder={isTyping ? "..." : "Enter command..."}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm"
                    autoComplete="off"
                    autoFocus
                />
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
