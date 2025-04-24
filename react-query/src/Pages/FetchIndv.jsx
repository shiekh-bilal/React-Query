import { NavLink, useParams } from "react-router-dom";
import {fetchPosts, fetchInvPost} from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchIndv = () => {

  const {id} = useParams();
  const {data, isPending, isError, error} = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchInvPost(id),
  })

  if(isPending) return <p>Loading.......</p>
  if(isError) return <p>Error: {error || "Something went wrong!"}</p>

  return (
    <div className="section-accordion">
      <p>ID: {id}</p>
      <p>TITLE: {data.title}</p>
      <p>BODY: {data.body}</p>

      <NavLink to="/rq">
        <button>Go back</button>
      </NavLink>
    </div>
  )
};