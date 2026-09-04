"use client";

import type { UIMessage } from "ai";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@/components/ui/message";

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function MessageList({
  messages,
  userName,
  isStreaming
}:{
  messages: UIMessage[];
  userName?: string | null;
  isStreaming: boolean;
}){
  const displayName = userName ?? "You";

  if(!messages.length)  {
    return <div className="flex-1" />;
  }

  return (
    <ScrollArea className="flex-1">
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      <MessageGroup>
        {messages.map((message) => (
          <Message
            key={message.id}
            align={message.role === "user" ? "end" : "start"}
          >
            <MessageAvatar>
              <Avatar size="sm">
                <AvatarFallback>
                  {message.role === "user"
                    ? displayName.slice(0, 1).toUpperCase()
                    : "AI"}
                </AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble
                align={message.role === "user" ? "end" : "start"}
                variant={message.role === "user" ? "default" : "muted"}
              >
                <BubbleContent>{getMessageText(message)}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        ))}
      </MessageGroup>

      {isStreaming && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner />
        </div>
      )}
    </div>
  </ScrollArea>
  )
}