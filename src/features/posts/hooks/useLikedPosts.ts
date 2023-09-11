import axios from 'axios';
import { Post } from '@/db/schema';
import { useQuery } from '@tanstack/react-query';

export const useLikedPosts = (username: string) => {
  return useQuery(
    ['liked_posts', username],
    async () => {
      return axios.get<Post[]>(`/api/posts/liked/${username}`);
    },
    {
      enabled: !!username
    }
  );
};
