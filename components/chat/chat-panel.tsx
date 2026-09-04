"use client";

import { useChat } from "@ai-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useState } from "react";
import { MessageInput } from "@/components/chat/message-input";
import { MessageList } from "@/components/chat/message-list";
import { Separator } from "@/components/ui/separator";
import { chatKeys } from "@/hooks/chat/keys";

export function ChatPanel({
    conversationId,
    userName,
    initialMessages
}:{
    conversationId: string;
    userName?: string | null;
    initialMessages: UIMessage[];
}){
    const queryClient  = useQueryClient();
    const [input , setInput] = useState("");

    const { messages, sendMessage, status } = useChat({
        id: conversationId,
        messages: initialMessages,
        transport: new DefaultChatTransport({
          api: "/api/chat",
          prepareSendMessagesRequest({ messages, id }) {
            return {
              body: {
                message: messages[messages.length - 1],
                conversationId: id,
              },
            };
          },
        }),
        onFinish: () => {
          queryClient.invalidateQueries({ queryKey: chatKeys.conversations() });
        },
      });

      const isBusy = status === "submitted" || status === "streaming";

      function handleSend() {
        const text = input.trim();
        if (!text || isBusy) return;
    
        sendMessage({ text });
        setInput("");
      }

      return (
        <>
          <MessageList 
            messages={messages}
            userName={userName}
            isStreaming={isBusy}
          />
    
          <Separator />
    
          <MessageInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={isBusy}
          />
        </>
      );
}