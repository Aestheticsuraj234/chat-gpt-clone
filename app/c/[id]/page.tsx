import { auth } from "@clerk/nextjs/server";
import { ChatDashboard } from "@/components/chat/chat-dashboard";
import { onBoardCurrentUser } from "@/lib/user/onboard";
import { loadConversationMessages } from "@/lib/chat/message-store";

export default async function ConversationPage({
  params,
}: PageProps<"/c/[id]">) {
  await auth.protect();
  const user = await onBoardCurrentUser();
  const { id } = await params;
  const initialMessages = await loadConversationMessages(id);

  return (
    <ChatDashboard conversationId={id} userName={user?.name} initialMessages={initialMessages} />
  );
}