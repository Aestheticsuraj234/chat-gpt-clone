"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@/components/ui/message";
import { useMessages } from "@/hooks/chat/use-messages";

export function MessageList({
    conversationId,
    userName,
  }: {
    conversationId?: string;
    userName?: string | null;
  }) {
    const messages = useMessages(conversationId ?? null);
    const displayName = userName || "You";
  
    if (!conversationId) {
      return <div className="flex-1" />;
    }
  
    if (messages.isLoading) {
      return (
        <div className="flex flex-1 flex-col gap-4 p-6">
          <Skeleton className="h-16 w-2/3 rounded-3xl" />
          <Skeleton className="h-16 w-1/2 rounded-3xl self-end" />
          <Skeleton className="h-16 w-2/3 rounded-3xl" />
        </div>
      );
    }
  
    if (!messages.data?.length) {
      return <div className="flex-1" />;
    }
  
    return (
      <ScrollArea className="flex-1">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
          <MessageGroup>
            {messages.data.map((message) => (
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
                    <BubbleContent>{message.content}</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            ))}
          </MessageGroup>
        </div>
      </ScrollArea>
    );
  }