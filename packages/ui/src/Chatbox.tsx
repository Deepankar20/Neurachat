import React, { useState, useRef, useEffect } from "react";
import "./ChatComponent.css";

type Theme = "slate" | "violet" | "pink" | "green" | "orange";

// "id": "cm4zs3jxr0001cmck7oonk411",
//     "name": "Test app 2",
//     "context": "Its an app where users can create chatrooms and have a chat ",
//     "apiKey": "user_2qZ7ub76E7Ae7grOOcODuNpWQv5-8klqktmmma",
//     "userId": "user_2qZ7ub76E7Ae7grOOcODuNpWQv5",
//     "createdAt": "2024-12-22T15:44:10.671Z",
//     "updatedAt": "2024-12-22T15:44:10.671Z"

type AppType = {
  id: string;
  name: string;
  context: string;
  apiKey: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

const ChatComponent = (props: { apiKey: string; theme?: Theme }) => {
  const { theme = "slate" } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [app, setApp] = useState<AppType>();
  const [messages, setMessages] = useState<
    { text: string; side: "left" | "right" }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function fetchApp() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/app/getApp?apiKey=${props.apiKey}`
        );

        const data = await response.json();

        setApp(data.data);
        console.log(data.data);
      } catch (error) {
        console.log("error fetching the App");
      }
    }

    fetchApp();
  }, []);

  const formatText = (text: string) => {
    return text
      .split("***")
      .map((segment) => segment.trim())
      .filter(Boolean)
      .map((segment) => {
        if (segment.includes(":")) {
          const [title, ...content] = segment.split(":");
          return `• ${title}:\n  ${content.join(":").trim()}`;
        }
        return segment;
      })
      .join("\n\n");
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      // Add user's message (right side)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, side: "right" },
      ]);
      setNewMessage("");

      try {
        setTyping(true);
        // Send the message to the backend via fetch
        const response = await fetch(
          "http://localhost:8080/api/v1/chat/sendMessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: newMessage, apiKey: props.apiKey }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const data = await response.json();
        console.log(data);
        setTyping(false);
        // Add the backend's response (left side)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.data, side: "left" },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        // Handle error (add an error message from backend)
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error: Unable to fetch response.", side: "left" },
        ]);
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={`chat-container theme-${theme}`}>
      {/* Chat Toggle Button */}
      <button onClick={toggleChat} className="chat-toggle-button">
        {isOpen ? "Close" : "💬"}
      </button>

      {/* Chat Box */}
      <div className={`chat-box ${isOpen ? "visible" : ""}`}>
        {/* Header */}
        <div className="chat-header">
          {app ? `${app.name}` : ``}{" "}
          <p className="integration">powered by Neurachat</p>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.side === "left" ? "message-left" : "message-right"}`}
            >
              {message.side === "right"
                ? message.text
                : formatText(message.text)}
            </div>
          ))}

          {typing ? (
            <div className={`chat-message message-left`}>typing...</div>
          ) : (
            ""
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="chat-send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
