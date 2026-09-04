"use client";

import { useChat } from "@ai-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "@/components/chat/chat-header";
import { MessageInput } from "@/components/chat/message-input";
import { MessageList } from "@/components/chat/message-list";
import { chatKeys } from "@/hooks/chat/keys";

export function ChatPanel({
  conversationId,
  userName,
  initialMessages,
}: {
  conversationId: string;
  userName?: string | null;
  initialMessages: UIMessage[];
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [input, setInput] = useState("");
  const initialQuerySent = useRef(false);

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

  useEffect(() => {
    const initialQuery = searchParams.get("q")?.trim();
    if (
      !initialQuery ||
      initialQuerySent.current ||
      initialMessages.length > 0 ||
      isBusy
    ) {
      return;
    }

    initialQuerySent.current = true;
    sendMessage({ text: initialQuery });
    router.replace(`/c/${conversationId}`, { scroll: false });
  }, [
    searchParams,
    initialMessages.length,
    isBusy,
    sendMessage,
    conversationId,
    router,
  ]);

  function handleSend(text?: string) {
    const message = (text ?? input).trim();
    if (!message || isBusy) return;

    sendMessage({ text: message });
    setInput("");
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ChatHeader title="ChaiGPT" />

      <MessageList
        messages={messages}
        userName={userName}
        isStreaming={isBusy}
        onSuggestionClick={handleSend}
      />

      <MessageInput
        value={input}
        onChange={setInput}
        onSend={() => handleSend()}
        disabled={isBusy}
      />
    </div>
  );
}
