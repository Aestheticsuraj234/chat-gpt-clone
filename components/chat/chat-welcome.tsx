"use client";

import {
  Code2Icon,
  LightbulbIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CHAT_SUGGESTIONS = [
  {
    icon: LightbulbIcon,
    title: "Explain recursion",
    prompt: "Explain recursion in simple terms with a short example.",
  },
  {
    icon: Code2Icon,
    title: "Debug React",
    prompt: "My React component re-renders too often. What should I check first?",
  },
  {
    icon: WandSparklesIcon,
    title: "CSS centering",
    prompt: "How do I center a div in CSS using modern layout?",
  },
  {
    icon: SparklesIcon,
    title: "Learn AI SDK",
    prompt: "What should I learn next to build chat apps with the Vercel AI SDK?",
  },
] as const;

export function ChatWelcome({
  onSuggestionClick,
}: {
  onSuggestionClick?: (prompt: string) => void;
}) {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-8 px-2 py-6 text-center md:py-10">
      <div className="space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <SparklesIcon className="size-5" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          What can I help with?
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          Ask anything — explanations, debugging, code snippets, or learning
          paths. Pick a starter below or type your own message.
        </p>
      </div>

      {onSuggestionClick && (
        <div className="grid w-full gap-2 sm:grid-cols-2">
          {CHAT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.title}
              type="button"
              onClick={() => onSuggestionClick(suggestion.prompt)}
              className={cn(
                "group flex flex-col items-start gap-2 rounded-2xl border border-border/60 bg-card/50 px-4 py-3.5 text-left transition-all",
                "hover:border-border hover:bg-card hover:shadow-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              )}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <suggestion.icon className="size-3.5" />
                </span>
                {suggestion.title}
              </span>
              <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {suggestion.prompt}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
