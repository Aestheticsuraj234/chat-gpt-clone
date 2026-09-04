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
import { ModeToggle } from "./ui/mode-toggle";

export function ChatDashboard() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex flex-col gap-2 p-3">
          <div className="px-2 text-lg font-semibold">ChaiGPT</div>
          <Button className="w-full justify-start">
            <PlusIcon data-icon="inline-start" />
            New chat
          </Button>
        </SidebarHeader>

        <SidebarContent />

        <SidebarFooter className="p-3 flex flex-row justify-between items-center">
          
          <UserButton showName />
          <ModeToggle />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <div className="flex-1" />

        <Separator />

        <div className="p-4">
          <div className="mx-auto w-full max-w-3xl">
            <InputGroup className="h-auto min-h-12">
              <InputGroupTextarea rows={1} />
              <InputGroupAddon align="inline-end">
                <InputGroupButton size="icon-sm">
                  <SendIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
