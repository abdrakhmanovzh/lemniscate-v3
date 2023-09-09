import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      password
    }: {
      username: string;
      password: string;
    }) => {
      return axios.post('/api/auth/signup', { username, password });
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    }
  });
};
