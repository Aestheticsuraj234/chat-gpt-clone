"use server";
import type {User} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";

function getDisplayName(clerkUser: User) {
    if (clerkUser.fullName) {
      return clerkUser.fullName;
    }
  
    const parts = [clerkUser.firstName, clerkUser.lastName].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : null;
}
  
function getPrimaryEmail(clerkUser: User) {
    return (
      clerkUser.emailAddresses.find(
        (email) => email.id === clerkUser.primaryEmailAddressId,
      ) ?? clerkUser.emailAddresses[0]
    );
  }

export async function syncUserFromClerk(clerkUser: User) {
    const primaryEmail = getPrimaryEmail(clerkUser);

  if (!primaryEmail?.emailAddress) {
    throw new Error("Clerk user is missing a primary email address.");
  }

  const profile = {
    email: primaryEmail.emailAddress,
    name:getDisplayName(clerkUser),
    imageUrl:clerkUser.imageUrl,
  }



  return prisma.user.upsert({
    where:{
        clerkId:clerkUser.id
    },
    create: {
        clerkId: clerkUser.id,
        ...profile,
      },
      update: profile,
  })
}