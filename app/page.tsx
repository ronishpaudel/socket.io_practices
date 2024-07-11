"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ChatPage from "./src/component/chatApp";

const queryClient = new QueryClient();
const page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatPage />
    </QueryClientProvider>
  );
};

export default page;
