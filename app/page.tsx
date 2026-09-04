import { ChatDashboard } from "@/components/chat/chat-dashboard";
import { Button } from "@/components/ui/button";
import { onBoardCurrentUser } from "@/lib/user/onboard";
import {  UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async   function Home() {
  await auth.protect();
  const user = await onBoardCurrentUser();
  return (
 <ChatDashboard userName={user?.name} />
  );
}
