//@ts-nocheck
"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Tmessages, useGetMessages } from "../hooks/getMessages";
import { usePostMessages } from "../hooks/postMessages";

let socket: ReturnType<typeof io>;

const ChatPage = () => {
  const { data: messages = [], refetch } = useGetMessages();
  const { mutate } = usePostMessages();
  const [message, setMessage] = useState("");
  console.log({ messages });

  useEffect(() => {
    socket = io(
      process.env.NEXT_PUBLIC_LOCAL_HOST || process.env.NEXT_PUBLIC_LOCAL_HOST
    );

    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("message", () => {
      refetch();
    });

    return () => {
      socket.disconnect();
    };
  }, [refetch]);

  const sendMessage = () => {
    if (message.trim()) {
      mutate(message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Socket.io with Next.js</h1>
      <div className="w-full max-w-md p-4 border border-gray-300 rounded-lg bg-white">
        <div className="flex flex-col space-y-4 mb-4">
          {messages.map((msg: Tmessages, index: number) => (
            <div
              key={index}
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`p-2 rounded-lg w-40 h-10 ${
                  index % 2 === 0
                    ? "bg-blue-500 text-white rounded-tl-none"
                    : "bg-gray-300 text-black rounded-tr-none"
                }`}
              >
                {msg}
              </div>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
