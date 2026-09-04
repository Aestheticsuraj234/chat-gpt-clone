"use client";

import { ArrowUpIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export function MessageInput({
  value,
  onChange,
  onSend,
  disabled,
  placeholder = "Message ChaiGPT…",
}: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  const canSend = !disabled && value.trim().length > 0;

  return (
    <div className="shrink-0 px-4 pb-4 pt-2 md:px-6 md:pb-6">
      <div className="mx-auto w-full max-w-3xl">
        <InputGroup className="h-auto min-h-12 rounded-2xl border-border/50 bg-card/80 shadow-sm backdrop-blur-sm has-[[data-slot=input-group-control]:focus-visible]:border-ring/50 has-[[data-slot=input-group-control]:focus-visible]:shadow-md">
          <InputGroupTextarea
            rows={1}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-11 resize-none py-3 pl-4 text-[0.9375rem]"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <InputGroupAddon align="inline-end" className="pr-2">
            <InputGroupButton
              size="icon-sm"
              variant="default"
              onClick={onSend}
              disabled={!canSend}
              className="size-8 rounded-xl"
            >
              <ArrowUpIcon className="size-4" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <p className="mt-2 text-center text-[0.6875rem] text-muted-foreground/80">
          Enter to send · Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}
