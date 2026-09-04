"use server";
import { currentUser } from "@clerk/nextjs/server";
import { syncUserFromClerk } from "./sync-user";

export async function onBoardCurrentUser(){
    const clerkUser = await currentUser();

    if(!clerkUser){
        return null;
    }

    return syncUserFromClerk(clerkUser)
}