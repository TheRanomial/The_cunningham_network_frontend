"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChatInterface from "../components/ChatInterface";
import ConversationSidebar from "../components/ConversationSidebar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const addMessageToConversation = (message: Message) => {
    setConversations((prevConversations) => {
      if (currentConversationId) {
        return prevConversations.map((conv) =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, message] }
            : conv
        );
      } else {
        const newConversation: Conversation = {
          id: Date.now().toString(),
          title:
            message.content.slice(0, 30) +
            (message.content.length > 30 ? "..." : ""),
          messages: [message],
        };
        setCurrentConversationId(newConversation.id);
        return [...prevConversations, newConversation];
      }
    });
  };

  return (
    <div
      className={`min-h-screen flex transition-all duration-500 overflow-hidden
                     ${
                       darkMode
                         ? "dark bg-gray-900"
                         : "bg-gradient-to-br from-blue-100 to-purple-100"
                     }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[40rem] w-[40rem] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
        </div>
      </div>

      <motion.button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-4 left-4 p-3 rounded-full transition-colors duration-300 z-20
                    ${
                      darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-800"
                    }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {sidebarOpen ? "✕" : "☰"}
      </motion.button>

      <ConversationSidebar
        darkMode={darkMode}
        isOpen={sidebarOpen}
        conversations={conversations}
        currentConversationId={currentConversationId}
        setCurrentConversationId={setCurrentConversationId}
      />

      <main
        className={`flex-1 flex flex-col items-center justify-center p-4 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className={`fixed top-4 right-4 p-3 rounded-full transition-colors duration-300
                      ${
                        darkMode
                          ? "bg-purple-700 text-gray-900"
                          : "bg-indigo-600 text-yellow-400"
                      }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? "☀️" : "🌙"}
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r
                      ${
                        darkMode
                          ? "from-blue-400 to-purple-400"
                          : "from-blue-600 to-purple-600"
                      }`}
        >
          The Cunningham Network
        </motion.h1>

        <motion.ul
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-sm mb-5 text-center ${
            darkMode ? "text-gray-300" : "text-gray-600"
          } max-w-2xl`}
        >
          The user MUST provide their Wallet private key
        </motion.ul>

        <ChatInterface
          darkMode={darkMode}
          addMessageToConversation={addMessageToConversation}
          currentConversation={
            conversations.find((conv) => conv.id === currentConversationId) ||
            null
          }
        />
      </main>
    </div>
  );
}
