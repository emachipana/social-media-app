import axios from "axios";

const baseUrl = "http://localhost:3001/posts";

const createPost = async (token, payload) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  }

  const { data } = await axios.post(baseUrl, payload, config);
  return data;
}

const PostService = { createPost };

export default PostService;
