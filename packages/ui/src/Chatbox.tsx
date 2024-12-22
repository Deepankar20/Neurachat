import React, { useState } from "react";
import { motion } from "framer-motion";

const ChatComponent = (props: { apiKey: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage(""); // Clear the input field after sending
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-full shadow-lg hover:scale-110 focus:outline-none"
        whileHover={{ scale: 1.1 }}
        animate={
          isOpen
            ? { scale: 1 }
            : {
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0 rgba(0, 0, 0, 0.2)",
                  "0 0 20px rgba(106, 90, 205, 0.5)",
                  "0 0 0 rgba(0, 0, 0, 0.2)",
                ],
              }
        }
        transition={{ duration: 0.6, repeat: isOpen ? 0 : Infinity }}
      >
        {isOpen ? "Close" : "💬"}
      </motion.button>

      {/* Chat Box */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 50,
          scale: isOpen ? 1 : 0.8,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`absolute bottom-16 right-0 w-96 bg-white rounded-xl shadow-2xl overflow-hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg">
          Customer Support
        </div>

        {/* Chat Messages */}
        <div className="p-4 h-64 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className="mb-2 flex justify-end items-center"
              >
                <div className="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg shadow-sm max-w-xs">
                  {message}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-gray-100 flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatComponent;
