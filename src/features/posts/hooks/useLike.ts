import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      postId
    }: {
      username: string;
      postId: string;
    }) => {
      return axios.put(`/api/posts/${postId}`, { username });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });
};
