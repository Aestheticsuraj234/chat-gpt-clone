"use client";

import type { UIMessage } from "ai";
import { SparklesIcon } from "lucide-react";
import { MarkdownMessage } from "@/components/chat/markdown-message";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { cn } from "@/lib/utils";

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function MessageList({
  messages,
  userName,
  isStreaming,
  onSuggestionClick,
}: {
  messages: UIMessage[];
  userName?: string | null;
  isStreaming?: boolean;
  onSuggestionClick?: (prompt: string) => void;
}) {
  const displayName = userName || "You";

  if (!messages.length) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4">
        <ChatWelcome onSuggestionClick={onSuggestionClick} />
      </div>
    );
  }

  return (
    <MessageScrollerProvider autoScroll>
      <MessageScroller className="min-h-0 flex-1 overflow-hidden !size-auto">
        <MessageScrollerViewport>
          <MessageScrollerContent className="mx-auto w-full max-w-3xl gap-8 px-4 py-6 md:py-10">
            {messages.map((message) => {
              const isUser = message.role === "user";
              const text = getMessageText(message);
              const isLastAssistantStreaming =
                isStreaming &&
                !isUser &&
                message.id === messages[messages.length - 1]?.id;

              if (isUser) {
                return (
                  <MessageScrollerItem
                    key={message.id}
                    messageId={message.id}
                    scrollAnchor
                  >
                    <div className="flex justify-end gap-3">
                      <div className="flex max-w-[85%] flex-col items-end gap-1.5">
                        <span className="px-1 text-xs font-medium text-muted-foreground">
                          {displayName}
                        </span>
                        <Bubble align="end" variant="default">
                          <BubbleContent className="rounded-2xl px-4 py-2.5">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">
                              {text}
                            </p>
                          </BubbleContent>
                        </Bubble>
                      </div>
                      <Avatar size="sm" className="mt-5 shrink-0">
                        <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                          {displayName.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </MessageScrollerItem>
                );
              }

              return (
                <MessageScrollerItem
                  key={message.id}
                  messageId={message.id}
                >
                  <div className="flex gap-3">
                    <Avatar size="sm" className="mt-0.5 shrink-0">
                      <AvatarFallback className="bg-muted text-xs">
                        <SparklesIcon className="size-3.5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <span className="px-1 text-xs font-medium text-muted-foreground">
                        ChaiGPT
                      </span>
                      <div
                        className={cn(
                          "min-w-0 rounded-2xl px-1",
                          !text && "py-1"
                        )}
                      >
                        {text ? (
                          <MarkdownMessage
                            content={text}
                            isAnimating={isLastAssistantStreaming}
                          />
                        ) : (
                          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                            <span className="size-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
                            <span className="size-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </MessageScrollerItem>
              );
            })}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}
