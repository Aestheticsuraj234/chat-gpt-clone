"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function ChatHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b border-border/50 bg-background/60 px-4 py-3 backdrop-blur-md md:px-6">
      <SidebarTrigger className="-ml-1 size-8" />
      <Separator orientation="vertical" className="mr-1 h-4" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h1 className="truncate text-sm font-medium">{title}</h1>
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <span className="hidden rounded-full bg-muted px-2.5 py-0.5 text-[0.6875rem] font-medium text-muted-foreground sm:inline">
        gpt-4o-mini
      </span>
    </header>
  );
}
