"use client";

import { SendIcon } from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useCreateMessage } from "@/hooks/chat/use-messages";

export function MessageInput({
    conversationId,
  }: {
    conversationId?: string;
  }) {
    const [text, setText] = useState("");
    const createMessage = useCreateMessage();
  
    async function handleSend() {
      const content = text.trim();
      if (!content || !conversationId) return;
  
      setText("");
      await createMessage.mutateAsync({
        conversationId,
        content,
        role: "user",
      });
    }
  
    return (
      <div className="p-4">
        <div className="mx-auto w-full max-w-3xl">
          <InputGroup className="h-auto min-h-12">
            <InputGroupTextarea
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={!conversationId || createMessage.isPending}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-sm"
                onClick={handleSend}
                disabled={!conversationId || !text.trim() || createMessage.isPending}
              >
                <SendIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    );
  }