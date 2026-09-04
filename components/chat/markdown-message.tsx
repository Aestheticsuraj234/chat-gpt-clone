"use client";

import { code } from "@streamdown/code";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";

const plugins = { code };

export function MarkdownMessage({
  content,
  isAnimating,
  className,
}: {
  content: string;
  isAnimating?: boolean;
  className?: string;
}) {
  return (
    <Streamdown
      className={cn(
        "streamdown text-[0.9375rem] leading-relaxed text-foreground [&_pre]:my-3 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border/50 [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-0.5 [&_h1]:mb-3 [&_h1]:mt-4 [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-sm [&_h3]:font-semibold [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_code:not(pre_code)]:rounded-md [&_code:not(pre_code)]:bg-muted [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-[0.8125rem]",
        className
      )}
      plugins={plugins}
      isAnimating={isAnimating}
      shikiTheme={["github-light", "github-dark"]}
      lineNumbers={false}
    >
      {content}
    </Streamdown>
  );
}
