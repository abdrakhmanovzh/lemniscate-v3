import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type FollowingsResponse = {
  followings: string[];
};

export const useFollowings = (username: string) => {
  return useQuery(['followings', username], async () => {
    return axios.get<FollowingsResponse>(`/api/users/followings/${username}`);
  });
};
