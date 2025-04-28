import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchPosts } from '../API/api';
import { QUERY_KEYS } from '../constants/queryKeys';

export const usePosts = (pageNumber) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS, pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    placeholderData: keepPreviousData,
    //refetchInterval: 1000,
  });
};
