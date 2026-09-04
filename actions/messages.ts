"use server";
import { prisma } from "@/lib/db";
import { getDbUser } from "@/lib/auth/get-db-user";

export async function getMessages(conversationId: string) {
    const user = await getDbUser();
  
    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId: user.id },
    });
  
    if (!conversation) {
      throw new Error("Conversation not found");
    }
  
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
  }
  
  export async function createMessage(
    conversationId: string,
    content: string,
    role: "user" | "assistant",
  ) {
    const user = await getDbUser();
  
    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId: user.id },
    });
  
    if (!conversation) {
      throw new Error("Conversation not found");
    }
  
    const message = await prisma.message.create({
      data: {
        conversationId,
        content,
        role,
      },
    });
  
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        updatedAt: new Date(),
        title:
          role === "user" && conversation.title === "New chat"
            ? content.slice(0, 40)
            : conversation.title,
      },
    });
  
    return message;
  }
  
  export async function deleteMessage(messageId: string) {
    const user = await getDbUser();
  
    const message = await prisma.message.findFirst({
      where: { id: messageId },
      include: { conversation: true },
    });
  
    if (!message || message.conversation.userId !== user.id) {
      throw new Error("Message not found");
    }
  
    return prisma.message.delete({
      where: { id: messageId },
    });
  }