import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      text,
      username,
      imageFilename
    }: {
      text: string;
      username: string;
      imageFilename: string;
    }) => {
      return axios.post('/api/posts', { text, username, imageFilename });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });
};
