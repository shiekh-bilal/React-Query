import { useState, useCallback } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useDeletePost } from '../hooks/useDeletePost';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const { data, isPending, isError, error } = usePosts(pageNumber);
  const deleteMutation = useDeletePost(pageNumber);

  const handleDelete = useCallback((id) => {
    deleteMutation.mutate(id);
  }, [deleteMutation]);

  if (isPending) return <Loading />;
  if (isError) return <Error error={error} />;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="pagination-section container">
        <button disabled = {pageNumber === 0 ? true : false} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>
          <h2>{(pageNumber/3) + 1}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};