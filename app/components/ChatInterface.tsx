import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import axios from "axios";
import { ArrowBigUp } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatInterfaceProps {
  darkMode: boolean;
  addMessageToConversation: (message: Message) => void;
  currentConversation: Conversation | null;
}

export default function ChatInterface({
  darkMode,
  addMessageToConversation,
  currentConversation,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [currentConversation?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    addMessageToConversation(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/chat", {
        userInput: input,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.response,
      };
      addMessageToConversation(assistantMessage);
    } catch (error) {
      console.error("Error:", error);
      addMessageToConversation({
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-4xl h-[600px] flex flex-col rounded-lg overflow-hidden shadow-xl ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentConversation?.messages.map((message, index) => (
          <MessageBubble key={index} message={message} darkMode={darkMode} />
        ))}
        {isLoading && (
          <div
            className={`flex justify-center items-center h-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <div className="animate-bounce mx-1">•</div>
            <div className="animate-bounce mx-1 animation-delay-200">•</div>
            <div className="animate-bounce mx-1 animation-delay-400">•</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`p-4 border-t ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className={`flex-1 p-2 rounded-md ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
            }`}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            } transition-colors duration-300`}
          >
            <ArrowBigUp />
          </button>
        </div>
      </form>
    </div>
  );
}
