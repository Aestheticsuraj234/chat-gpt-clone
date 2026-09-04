"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageSquareIcon,
  MoreHorizontalIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  useConversations,
  useCreateConversation,
  useDeleteConversation,
} from "@/hooks/chat/use-conversations";
import { ModeToggle } from "../ui/mode-toggle";


export function ConversationSidebar({activeId}:{activeId: string}) {
    const router = useRouter();
    const conversations = useConversations();
    const createConversation = useCreateConversation();
    const deleteConversation = useDeleteConversation();

    async function handleDelete(conversationId: string) {
        await deleteConversation.mutateAsync(conversationId);
    
        if (activeId === conversationId) {
          const next = conversations.data?.find((c) => c.id !== conversationId);
          router.push(next ? `/c/${next.id}` : "/");
        }
      }

      async function handleNewChat() {
        const conversation = await createConversation.mutateAsync();
        router.push(`/c/${conversation.id}`);
      }

      return (
        <>
        <SidebarHeader className="flex flex-col gap-2 p-3">
          <Link href="/" className="px-2 text-lg font-semibold">
            ChaiGPT
          </Link>
          <Button
            className="w-full justify-start"
            onClick={handleNewChat}
            disabled={createConversation.isPending}
          >
            <PlusIcon data-icon="inline-start" />
            New chat
          </Button>
        </SidebarHeader>
  
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarGroupContent>
              <ScrollArea className="h-full">
                <SidebarMenu>
                  {conversations.isLoading &&
                    Array.from({ length: 4 }).map((_, i) => (
                      <SidebarMenuItem key={i}>
                        <Skeleton className="h-8 w-full rounded-xl" />
                      </SidebarMenuItem>
                    ))}
  
                  {conversations.data?.map((conversation) => (
                    <SidebarMenuItem key={conversation.id}>
                      <SidebarMenuButton
                        isActive={conversation.id === activeId}
                        render={<Link href={`/c/${conversation.id}`} />}
                      >
                        <MessageSquareIcon />
                        <span>{conversation.title}</span>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <SidebarMenuAction showOnHover>
                              <MoreHorizontalIcon />
                            </SidebarMenuAction>
                          }
                        />
                        <DropdownMenuContent side="right" align="start">
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => handleDelete(conversation.id)}
                          >
                            <Trash2Icon />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
  
        <SidebarFooter className="p-3 flex flex-row justify-between items-center">
          <ModeToggle />
          <UserButton showName />
        </SidebarFooter>
      </>
      )
}