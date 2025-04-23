import { useEffect, useState } from "react";
import {fetchPosts} from "../API/api";

export const FetchOld = () => {

  const [posts, setPosts] = useState([]);

  const getPostsData = async () => {

    try {
      const res = await fetchPosts();
      console.log(res.data);
      res.status === 200 ? setPosts(res.data) : [];
    }
    catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <div>
      <ul className="section-accordion">
        {posts?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>

  )
};