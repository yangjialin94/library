"use client";

import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { Message } from "@/components/Message";

// Define the type for the join event data
type JoinDataType = {
  sid: string;
  username: string;
};

// Define the type for the chat event data
type ChatDataType = {
  sid: string;
  username: string;
  message: string;
};

// Define the type for the message
type MessageType = {
  type: string;
  sid: string;
  username: string;
  message?: string;
};

// Initialize the socket connection
const socket = io("http://localhost:8000", {
  path: "/sockets",
  transports: ["websocket"],
});

/**
 * Chat component that handles socket connection and displays messages.
 */
export const Chat = () => {
  // State variables
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [sid, setSid] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");

  // Ref to the messages container
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Effect to handle socket events
  useEffect(() => {
    // Listen for connection and disconnection events
    const handleConnect = () => {
      setIsConnected(true);
      setSid(socket.id);
    };

    // Listen for disconnection events
    const handleDisconnect = () => {
      setIsConnected(false);
      setSid(null);
    };

    // Listen for join events
    const handleJoin = (data: JoinDataType) => {
      // Update the messages state with the join event
      setMessages((prevMessages) => [...prevMessages, { ...data, type: "join" }]);
    };

    // Listen for leave events
    const handleLeave = (data: JoinDataType) => {
      // Update the messages state with the leave event
      setMessages((prevMessages) => [...prevMessages, { ...data, type: "leave" }]);
    };

    // Listen for chat events
    const handleChat = (data: ChatDataType) => {
      // Update the messages state with the chat event
      setMessages((prevMessages) => [...prevMessages, { ...data, type: "chat" }]);
    };

    // Attach event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("join", handleJoin);
    socket.on("leave", handleLeave);
    socket.on("chat", handleChat);

    // Clean up event listeners on component unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("join", handleJoin);
      socket.off("leave", handleLeave);
      socket.off("chat", handleChat);
    };
  }, []);

  // Effect to scroll to the bottom of the messages container when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to handle sending messages
  const handleSendMessage = () => {
    // Emit the chat event with the message
    if (message && message.trim().length) {
      socket.emit("chat", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Connection status indicator */}
      <div
        className={clsx("absolute top-6 right-6 h-4 w-4 rounded-full", {
          "bg-green-600": isConnected,
          "bg-red-600": !isConnected,
        })}
      />

      {/* Messages display */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden"
      >
        {messages.map((message, index) => (
          <Message key={index} msg={message} isSelf={message.sid === sid} />
        ))}
      </div>

      {/* Input field and send button */}
      <div className="flex w-full items-center gap-2 border-t bg-white p-3 pt-6">
        <input
          type="text"
          className="flex-1 rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-600 active:scale-95"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
