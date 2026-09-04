"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function getDbUser() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
