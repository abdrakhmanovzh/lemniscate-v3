import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const useFetchUsers = () => {
  return useQuery(['users'], async () => {
    return axios.get('/api/users');
  });
};
