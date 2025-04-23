import { NavLink } from "react-router-dom";
import {fetchPosts} from "../API/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    // staleTime: 5000,
    refetchInterval: 1000,
    refetchIntervalInBackground: true
  })

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
            </li>
          );
        })}
      </ul>
    </div>
  )
};