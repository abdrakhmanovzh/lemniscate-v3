import { Post } from '@/db/schema';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchPosts = () => {
  return useQuery(['posts'], async () => {
    return axios.get<Post[]>('/api/posts');
  });
};
