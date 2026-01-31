import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaTerminal, FaTimes, FaExpand, FaMinus } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// --- TYPEWRITER HELPER ---
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ChatWindow({ onClose, onAction }) {
  // --- STATE ---
  const [flowState, setFlowState] = useState('MENU');
  const [commandType, setCommandType] = useState(null);
  const [userName, setUserName] = useState("");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // --- REUSABLE TYPING ENGINE ---
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

  // --- BOOT SEQUENCE ---
  useEffect(() => {
    const runBootSequence = async () => {
      setIsTyping(true);
      setMessages([{ role: "bot", content: "" }]);

      const systemLines = [
        "> SYSTEM_BOOT_SEQUENCE_INITIATED...",
        "> USER_IDENTITY: UNKNOWN",
        "> CONNECTION: SECURE",
        "\n"
      ];
      
      const welcomeText = `**Hi, I'm Hammad's AI Assistant.**\n\nSelect an option to begin:\n\n**[1]** Perform Advanced Arithmetics\n\n**[2]** Determine Current Location\n\n**[3]** Switch Portfolio Mode\n\n(Type the number **1**, **2**, or **3**)\n type 'clear' to restart at any time. and exit to close the chat.\n`;

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
      for (let char of welcomeText) { appendText(char); await delay(30); }

      setIsTyping(false);
    };

    runBootSequence();
  }, []); 

  // --- AUTO SCROLL ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isMinimized]);

  // --- OPTIMIZED LOCATION HANDLER ---
  const handleLocationRequest = async () => {
    await typeBotResponse("> INITIALIZING SATELLITE UPLINK...\n> REQUESTING PERMISSION FROM BROWSER AGENT...\n> (If prompted, please click 'Allow' in your browser)", 20);
    
    if (!navigator.geolocation) {
        await typeBotResponse("> ERROR: GEOLOCATION NOT SUPPORTED BY THIS DEVICE.", 30);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await typeBotResponse(`> PERMISSION GRANTED.\n> COORDINATES ACQUIRED: [${latitude.toFixed(4)}, ${longitude.toFixed(4)}]\n> TRIANGULATING EXACT ADDRESS...`, 20);
            
            try {
                const res = await axios.post("http://localhost:5000/chat", {
                    message: "What is my exact location name based on these coordinates?", 
                    history: [],
                    location: { latitude, longitude }
                });
                await typeBotResponse(res.data.reply, 30);
            } catch (e) {
                await typeBotResponse("> ERROR: UNABLE TO RESOLVE ADDRESS DATA.", 30);
            }
        },
        async (error) => {
            await typeBotResponse("> ERROR: PERMISSION DENIED.\n> ACCESS TO GPS SENSORS WAS BLOCKED BY USER.", 30);
        }
    );
  };

  // --- NAVIGATION HANDLER ---
  const handleNavigation = (sectionId) => {
    if (sectionId === 'exit') { onClose(); return; }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      typeBotResponse(`> NAVIGATING TO SECTOR: ${sectionId.toUpperCase()}...`, 20);
      if (window.innerWidth < 768) {
          setTimeout(() => setIsMinimized(true), 800);
      }
    } else {
      typeBotResponse(`> ERROR: SECTOR '${sectionId}' NOT FOUND.`, 20);
    }
  };

  // --- MAIN INPUT HANDLER ---
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userText = input;
    const lowerText = userText.toLowerCase().trim();

    // GLOBAL EXIT
    if (lowerText === "exit") { onClose(); return; }

    // ====================================================
    // CLEAR COMMAND (NEW FEATURE)
    // ====================================================
    if (lowerText === "clear") {
        setMessages([]); // Wipe all history
        setFlowState('MENU'); // Reset to beginning
        setCommandType(null); // Clear any specific command memory
        setUserName("");
        setInput("");
        
        // Retype the original menu
        const resetText = `> TERMINAL CLEARED.\n> SYSTEM REBOOTING...\n\n**Hi, I'm Hammad's AI Assistant.**\n\nSelect an option to begin:\n\n**[1]** Perform Advanced Arithmetics\n\n**[2]** Determine Current Location\n\n**[3]** Switch Portfolio Mode / More\n\n(Type the number **1**, **2**, or **3**)`;
        
        // Small delay to let the UI clear before typing starts
        setTimeout(() => {
            typeBotResponse(resetText, 15);
        }, 100);
        return;
    }

    // MENU SHORTCUT (Alternative way to go back)
    if (lowerText === "menu") { 
        setFlowState('MENU'); 
        setMessages(prev => [...prev, { role: "user", content: userText }]);
        setInput("");
        setTimeout(() => typeBotResponse("> MAIN MENU LOADED.\n\n[1] Arithmetic\n\n[2] Location\n\n[3] Portfolio Mode"), 500);
        return;
    }

    setMessages(prev => [...prev, { role: "user", content: userText }]);
    setInput("");

    // --- MENU STATE ---
    if (flowState === 'MENU') {
        if (lowerText === "1" || lowerText.includes("arithmetic")) {
            setFlowState('ARITHMETIC_MODE');
            setTimeout(() => {
                typeBotResponse("> ARITHMETIC MODULE LOADED.\n> You are about to perform advanced calculations.\n> **What topic or formula would you like to know?**\n> (Type 'menu' to go back, or 'clear' to restart)", 30);
            }, 500);
            return;
        }

        if (lowerText === "2" || lowerText.includes("location")) {
            handleLocationRequest();
            return;
        }

        if (lowerText === "3" || lowerText.includes("switch") || lowerText === "more") {
             const type = lowerText.includes("switch") ? 'SWITCH' : 'MORE';
             setCommandType(type);
             setFlowState('ASK_NAME');
             setTimeout(() => typeBotResponse(type === 'SWITCH' 
                ? "> AUTHENTICATION REQUIRED (ADMIN).\n> PLEASE ENTER YOUR NAME:" 
                : "> GUEST ACCESS REQUESTED.\n> PLEASE ENTER YOUR NAME:"), 500);
             return;
        }
    }

    // --- ARITHMETIC MODE ---
    if (flowState === 'ARITHMETIC_MODE') {
        setIsTyping(true);
        try {
            const res = await axios.post("http://localhost:5000/chat", {
                message: userText,
                history: messages,
                location: null
            });
            setIsTyping(false);
            await typeBotResponse(res.data.reply, 30);
        } catch (err) {
            setIsTyping(false);
            await typeBotResponse("> CALCULATION ERROR. PLEASE RETRY.", 30);
        }
        return;
    }

    // --- PORTFOLIO FLOW ---
    if (flowState === 'ASK_NAME') {
      setUserName(userText);
      setFlowState('CONFIRM_PROCESS');
      const accessMsg = commandType === 'SWITCH' 
        ? "You are about to **SWITCH LAYOUTS** to the Secure Interface."
        : "You are about to access the **Full Navigation Menu**.";
      setTimeout(() => typeBotResponse(`> IDENTITY VERIFIED: **${userText}**\n\n${accessMsg}\n\n> SHALL WE PROCEED? (YES/NO)`), 500);
      return;
    }

    if (flowState === 'CONFIRM_PROCESS') {
      if (lowerText === "yes" || lowerText === "y") {
        setFlowState('NAV_MENU');
        if (commandType === 'SWITCH') {
            if (onAction) onAction({ type: "LAYOUT_SWITCH", layout: "frontend" });
            setTimeout(() => typeBotResponse(`> ACCESS GRANTED.\n> SYSTEM RECONFIGURED.\n> LOADING SECURE MODULES...`), 500);
        } else {
            setTimeout(() => typeBotResponse(`> ACCESS GRANTED.\n> LOADING STANDARD NAVIGATION...`), 500);
        }
      } else if (lowerText === "no" || lowerText === "n") {
        setFlowState('MENU');
        setCommandType(null);
        setUserName("");
        setTimeout(() => typeBotResponse(`> PROCESS ABORTED.\n> RETURNING TO MAIN MENU.\n\n[1] Arithmetic\n\n[2] Location\n\n[3] Portfolio`), 500);
      } else {
         typeBotResponse(`> INVALID INPUT. PLEASE TYPE "YES" OR "NO".`);
      }
      return;
    }

    // --- FALLBACK ---
    setIsTyping(true);
    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: userText,
        history: messages,
        location: null
      });
      setIsTyping(false);
      await typeBotResponse(res.data.reply, 30); 
    } catch (err) {
      setIsTyping(false);
      await typeBotResponse("> SYSTEM ERROR.", 30);
    }
  };

  const menuItems = commandType === 'SWITCH' 
    ? ['Home', 'Skills', 'Contact'] 
    : ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  return (
    <div className={`fixed bottom-12 w-85 md:w-96 z-[100] bg-black text-green-500 font-mono shadow-2xl rounded-lg overflow-hidden border border-green-800 animate-in slide-in-from-bottom-10 fade-in duration-300 flex flex-col transition-all ease-in-out ${isMinimized ? 'h-10' : 'h-[600px]'}`}>

      {/* HEADER */}
      <div className="h-10 bg-gray-900 flex items-center justify-between px-3 border-b border-green-800 select-none cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-2 text-xs font-bold">
          <FaTerminal />
          <span>root@hammad-portfolio:~</span>
        </div>
        <div className="flex items-center gap-3">
            <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="hover:text-white">
                {isMinimized ? <FaExpand size={12}/> : <FaMinus size={12}/>}
            </button>
            <button onClick={onClose} className="hover:text-red-500"><FaTimes size={14} /></button>
        </div>
      </div>

      {!isMinimized && (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
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
                    {isTyping && i === messages.length - 1 && msg.role === "bot" && (
                        <span className="animate-pulse inline-block w-2 h-4 bg-green-500 ml-1 align-middle"></span>
                    )}
                    </div>
                </div>
                ))}
                {flowState === 'NAV_MENU' && !isTyping && (
                <div className="grid grid-cols-2 gap-2 mt-4 border-t border-green-900 pt-4 animate-pulse">
                    {menuItems.map((item) => (
                        <button key={item} onClick={() => handleNavigation(item.toLowerCase())} className="bg-green-900/20 border border-green-700 hover:bg-green-700 text-green-400 hover:text-white py-2 text-xs rounded uppercase tracking-widest transition-all">[{item}]</button>
                    ))}
                    <button onClick={() => onClose()} className="bg-red-900/20 border border-red-700 hover:bg-red-700 text-red-400 hover:text-white py-2 text-xs rounded uppercase tracking-widest transition-all">[EXIT]</button>
                </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-3 bg-black border-t border-green-800">
                <div className="flex items-center gap-2">
                <span className="text-green-500 font-bold animate-pulse">_</span>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={isTyping} 
                    placeholder={isTyping ? "Processing..." : "Enter command..."}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-green-900 font-mono text-sm disabled:opacity-50"
                    autoComplete="off"
                    autoFocus
                />
                </div>
            </div>
        </>
      )}
    </div>
  );
}

export default ChatWindow;