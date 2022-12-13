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

const likePost = async (token, postId, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const { data } = await axios.patch(`${baseUrl}/${postId}/like`, { userId }, config);
  return data;
}

const PostService = { createPost, likePost };

export default PostService;
