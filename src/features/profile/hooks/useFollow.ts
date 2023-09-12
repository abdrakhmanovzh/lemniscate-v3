import axios from 'axios';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFollow = (from: string, to: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.put(`/api/users/follow`, {
        fromUsername: from,
        toUsername: to
      });
    },
    onSuccess: () => {
      toast.success(`done`);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['followings', from]);
    }
  });
};
