"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

interface WalletKeySidebarProps {
  darkMode: boolean;
  isOpen: boolean;
}

export default function WalletKeySidebar({
  darkMode,
  isOpen,
}: WalletKeySidebarProps) {
  const [walletKey, setWalletKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement wallet key submission logic
    console.log("Submitted wallet key:", walletKey);
    // You can add your logic here to handle the wallet key, such as storing it or using it for blockchain operations
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 bottom-0 w-64 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-lg z-10`}
    >
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2
          className={`text-xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Wallet Key
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
    </motion.div>
  );
}
