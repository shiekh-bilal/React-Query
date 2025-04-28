import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '../API/api';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useDeletePost = (pageNumber) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData([QUERY_KEYS.POSTS, pageNumber], (oldData) => {
        return oldData?.filter(post => post.id !== id);
      });
    },
  });
};
