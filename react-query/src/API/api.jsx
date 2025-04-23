import axios from "axios"

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})

const fetchPosts = () => {
  return api.get("/posts")
}

export default fetchPosts;