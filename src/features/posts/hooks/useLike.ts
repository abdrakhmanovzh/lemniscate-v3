import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useLike = (username: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => {
      return axios.put(`/api/posts/${postId}`, { username });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['liked_posts', username]);
    }
  });
};
