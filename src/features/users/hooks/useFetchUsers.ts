import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/db/schema';

export const useFetchUsers = () => {
  return useQuery(['users'], async () => {
    return axios.get<User[]>('/api/users');
  });
};
