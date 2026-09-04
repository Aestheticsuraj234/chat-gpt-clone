import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createConversation,
  deleteConversation,
  getConversation,
  getConversations,
  updateConversation,
} from "@/actions/conversations";
import { chatKeys } from "@/hooks/chat/keys";

export function useConversations() {
    return useQuery({
      queryKey: chatKeys.conversations(),
      queryFn: getConversations,
    });
  }
  
  export function useCreateConversation() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: createConversation,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: chatKeys.conversations() });
      },
    });
  }
  
  export function useUpdateConversation() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({
        conversationId,
        title,
      }: {
        conversationId: string;
        title: string;
      }) => updateConversation(conversationId, title),
      onSuccess: (_, { conversationId }) => {
        queryClient.invalidateQueries({ queryKey: chatKeys.conversations() });
        queryClient.invalidateQueries({
          queryKey: chatKeys.conversation(conversationId),
        });
      },
    });
  }
  
  export function useDeleteConversation() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteConversation,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: chatKeys.conversations() });
      },
    });
  }

