"use server";

import {prisma} from "@/lib/db";
import { getDbUser } from "@/lib/auth/get-db-user";

export async function getConversations() {
  const user = await getDbUser();

  return prisma.conversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getConversation(conversationId: string) {
    const user = await getDbUser();
  
    return prisma.conversation.findFirst({
      where: { id: conversationId, userId: user.id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
  }
  
  export async function createConversation(title = "New chat") {
    const user = await getDbUser();
  
    return prisma.conversation.create({
      data: {
        userId: user.id,
        title,
      },
    });
  }
  
  export async function updateConversation(conversationId: string, title: string) {
    const user = await getDbUser();
  
    return prisma.conversation.update({
      where: { id: conversationId, userId: user.id },
      data: { title },
    });
  }
  
  export async function deleteConversation(conversationId: string) {
    const user = await getDbUser();
  
    return prisma.conversation.delete({
      where: { id: conversationId, userId: user.id },
    });
  }
  