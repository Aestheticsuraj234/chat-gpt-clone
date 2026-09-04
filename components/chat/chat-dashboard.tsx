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

export function ChatDashboard({
  conversationId,
  userName
}:{
  conversationId: string;
  userName?: string | null;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
     <ConversationSidebar activeId={conversationId}/>
      </Sidebar>

      <SidebarInset className="flex flex-col">
       <MessageList conversationId={conversationId} userName={userName} />

       <Separator />

       <MessageInput conversationId={conversationId}/>
      </SidebarInset>
    </SidebarProvider>
  );
}
