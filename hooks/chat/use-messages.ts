import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversation } from "@/actions/conversations";
import {
  createMessage,
  deleteMessage,
  getMessages,
} from "@/actions/messages";
import { chatKeys } from "@/hooks/chat/keys";

export function useConversation(conversationId: string | null) {
    return useQuery({
      queryKey: chatKeys.conversation(conversationId ?? ""),
      queryFn: () => getConversation(conversationId!),
      enabled: !!conversationId,
    });
  }
  
  export function useMessages(conversationId: string | null) {
    return useQuery({
      queryKey: chatKeys.messages(conversationId ?? ""),
      queryFn: () => getMessages(conversationId!),
      enabled: !!conversationId,
    });
  }
  
  export function useCreateMessage() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({
        conversationId,
        content,
        role,
      }: {
        conversationId: string;
        content: string;
        role: "user" | "assistant";
      }) => createMessage(conversationId, content, role),
      onSuccess: (_, { conversationId }) => {
        queryClient.invalidateQueries({
          queryKey: chatKeys.messages(conversationId),
        });
        queryClient.invalidateQueries({
          queryKey: chatKeys.conversation(conversationId),
        });
        queryClient.invalidateQueries({ queryKey: chatKeys.conversations() });
      },
    });
  }
  
  export function useDeleteMessage() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteMessage,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: chatKeys.all });
      },
    });
  }
  