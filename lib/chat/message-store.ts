import type { UIMessage } from "ai";
import { getDbUser } from "@/lib/auth/get-db-user";
import { prisma } from "@/lib/db";

export function getMessageText(message: UIMessage) {
    return message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");
  }

  export async function loadConversationMessages(conversationId: string) {
    const user = await getDbUser();
  
    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId: user.id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
  
    if (!conversation) {
      throw new Error("Conversation not found");
    }
  
    return conversation.messages.map((message) => ({
      id: message.id,
      role: message.role as "user" | "assistant",
      parts: [{ type: "text" as const, text: message.content }],
    }));
  }
  
  export async function saveConversationMessages(
    conversationId: string,
    messages: UIMessage[],
  ) {
    const user = await getDbUser();
  
    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId: user.id },
    });
  
    if (!conversation) {
      throw new Error("Conversation not found");
    }
  
    const firstUserMessage = messages.find((message) => message.role === "user");
    const title =
      conversation.title === "New chat" && firstUserMessage
        ? getMessageText(firstUserMessage).slice(0, 40)
        : conversation.title;
  
    await prisma.$transaction([
      prisma.message.deleteMany({ where: { conversationId } }),
      prisma.message.createMany({
        data: messages.map((message) => ({
          conversationId,
          role: message.role,
          content: getMessageText(message),
        })),
      }),
      prisma.conversation.update({
        where: { id: conversationId },
        data: {
          title,
          updatedAt: new Date(),
        },
      }),
    ]);
  }