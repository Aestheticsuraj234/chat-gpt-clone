import {convertToModelMessages , createUIMessageStreamResponse , streamText , toUIMessageChunk , toUIMessageStream, type UIMessage} from "ai"
import { chatModel } from "@/lib/ai/model";
import { CHAT_SYSTEM_PROMPT } from "@/lib/ai/system-prompt";

import {
    loadConversationMessages,
    saveConversationMessages,
  } from "@/lib/chat/message-store";
  import { getDbUser } from "@/lib/auth/get-db-user";


export async function POST(req: Request) {
    await getDbUser();
    const {message , conversationId} = await req.json();

    const previousMessages = await loadConversationMessages(conversationId);
    const messages = [...previousMessages , message]

    const result = streamText({
        model:chatModel,
        system: CHAT_SYSTEM_PROMPT,
        messages:await convertToModelMessages(messages),
    })


    
  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
      onEnd: async ({ messages: allMessages }) => {
        await saveConversationMessages(conversationId, allMessages);
      },
    }),
  });
    
    
}