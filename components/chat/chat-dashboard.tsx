"use client";

import { UserButton } from "@clerk/nextjs";
import { PlusIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../ui/mode-toggle";
import { ConversationSidebar } from "./conversation-sidebar";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import type { UIMessage } from "ai";
import { ChatPanel } from "./chat-panel";

export function ChatDashboard({
  conversationId,
  userName,
  initialMessages
}:{
  conversationId: string;
  userName?: string | null;
  initialMessages: UIMessage[];
}) {
  return (
    <SidebarProvider>
      <Sidebar>
     <ConversationSidebar activeId={conversationId}/>
      </Sidebar>

      <SidebarInset className="flex flex-col">
      {conversationId ? (
          <ChatPanel
            conversationId={conversationId}
            userName={userName}
            initialMessages={initialMessages}
          />
        ) : (
          <>
            <div className="flex-1" />
            <Separator />
            <MessageInput
              value=""
              onChange={() => {}}
              onSend={() => {}}
              disabled
            />
          </>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
