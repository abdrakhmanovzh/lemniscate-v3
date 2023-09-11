import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChangeBio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bio, username }: { bio: string; username: string }) => {
      return axios.post(`/api/users/bio/${username}`, { bio });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['user']);
    }
  });
};
