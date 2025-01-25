"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { MessageSquare, Plus, Wallet } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

interface ConversationSidebarProps {
  darkMode: boolean;
  isOpen: boolean;
  conversations: Conversation[];
  currentConversationId: string | null;
  setCurrentConversationId: (id: string) => void;
}

export default function ConversationSidebar({
  darkMode,
  isOpen,
  conversations,
  currentConversationId,
  setCurrentConversationId,
}: ConversationSidebarProps) {
  const [walletKey, setWalletKey] = useState("");
  const conversationListRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted wallet key:", walletKey);
    try {
      const response = await axios.post("http://localhost:3001/init", {
        walletKey: walletKey,
      });
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (conversationListRef.current) {
      conversationListRef.current.scrollTop =
        conversationListRef.current.scrollHeight;
    }
  }, [conversations]);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 bottom-0 w-64 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg z-10 flex flex-col`}
    >
      <div className="flex-shrink-0">
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Conversations
          </h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="walletKey"
                className={`block mb-2 text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Enter your wallet key
              </label>
              <input
                type="text"
                id="walletKey"
                value={walletKey}
                onChange={(e) => setWalletKey(e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-50 text-gray-900 border-gray-300"
                }`}
                placeholder="Enter wallet key"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg flex items-center justify-center ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <Wallet size={20} className="mr-2" />
              Submit Wallet Key
            </button>
          </form>
        </div>
        <div className="p-4">
          <button
            className={`w-full py-2 px-4 rounded-lg mb-4 flex items-center justify-center ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            onClick={() => setCurrentConversationId("")}
          >
            <Plus size={20} className="mr-2" />
            New Chat
          </button>
        </div>
      </div>
      <div ref={conversationListRef} className="flex-grow overflow-y-auto p-4">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-2 rounded-lg cursor-pointer ${
                darkMode
                  ? conversation.id === currentConversationId
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                  : conversation.id === currentConversationId
                  ? "bg-gray-200 text-gray-800"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
              onClick={() => setCurrentConversationId(conversation.id)}
            >
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2" />
                <span className="font-medium">{conversation.title}</span>
              </div>
              <p className="text-sm truncate mt-1">
                {
                  conversation.messages[conversation.messages.length - 1]
                    ?.content
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
