"use client";

import type { UIMessage } from "ai";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { ConversationSidebar } from "@/components/chat/conversation-sidebar";
import { MessageInput } from "@/components/chat/message-input";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useCreateConversation } from "@/hooks/chat/use-conversations";

function ActiveChatPanel({
  conversationId,
  userName,
  initialMessages,
}: {
  conversationId: string;
  userName?: string | null;
  initialMessages: UIMessage[];
}) {
  return (
    <ChatPanel
      conversationId={conversationId}
      userName={userName}
      initialMessages={initialMessages}
    />
  );
}

function HomeChatArea({
  userName,
}: {
  userName?: string | null;
}) {
  const router = useRouter();
  const createConversation = useCreateConversation();
  const [input, setInput] = useState("");

  async function startChat(text?: string) {
    const message = (text ?? input).trim();
    if (!message || createConversation.isPending) return;

    const conversation = await createConversation.mutateAsync();
    const query = encodeURIComponent(message);
    router.push(`/c/${conversation.id}?q=${query}`);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ChatHeader
        title="ChaiGPT"
        subtitle={`Welcome back${userName ? `, ${userName}` : ""}`}
      />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden">
          <ChatWelcome onSuggestionClick={startChat} />
        </div>

        <MessageInput
          value={input}
          onChange={setInput}
          onSend={() => startChat()}
          disabled={createConversation.isPending}
          placeholder="Start a new conversation…"
        />
      </div>
    </div>
  );
}

export function ChatDashboard({
  conversationId,
  userName,
  initialMessages = [],
}: {
  conversationId?: string;
  userName?: string | null;
  initialMessages?: UIMessage[];
}) {
  return (
    <SidebarProvider className="h-svh min-h-svh">
      <Sidebar variant="inset" collapsible="offcanvas">
        <ConversationSidebar activeId={conversationId ?? ""} />
      </Sidebar>

      <SidebarInset className="flex min-h-0 flex-col overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(from_var(--primary)_l_c_h/0.12),transparent)]" />
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          {conversationId ? (
            <Suspense
              fallback={
                <div className="flex min-h-0 flex-1 flex-col">
                  <ChatHeader title="Loading…" />
                </div>
              }
            >
              <ActiveChatPanel
                conversationId={conversationId}
                userName={userName}
                initialMessages={initialMessages}
              />
            </Suspense>
          ) : (
            <HomeChatArea userName={userName} />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
