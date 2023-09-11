import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/db/schema';

export const useFetchUser = (username: string) => {
  return useQuery(['user', username], async () => {
    return axios.get<User>(`/api/users/${username}`);
  });
};
