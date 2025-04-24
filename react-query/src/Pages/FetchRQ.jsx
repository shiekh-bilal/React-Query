import { NavLink } from "react-router-dom";
import {deletePost, fetchPosts} from "../API/api";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const FetchRQ = () => {

  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(0);
  const {data, isPending, isError, error} = useQuery({
    queryKey: ['posts', pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    placeholderData: keepPreviousData
    // staleTime: 5000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true
  })

  //! mutation function to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(['posts', pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      })
    },
  });
  if(isPending) return <p>Loading.......</p>
  if(isError) return <p>Error: {error || "Something went wrong!"}</p>

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
            </li>
          );
        })}
      </ul>

      <div className="pagination-section container">
        <button disabled = {pageNumber === 0 ? true : false} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>
        <h2>{(pageNumber/3) + 1}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  )
};