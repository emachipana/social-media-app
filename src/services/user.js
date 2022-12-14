import axios from "axios";

const baseUrl = "http://localhost:3001/users";

const getUser = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const { data } = await axios.get(`${baseUrl}/${id}`, config);
  return data;
}

const addRemoveFriend = async (token, userId, friendId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const { data } = await axios.patch(`${baseUrl}/${userId}/${friendId}`, {}, config);
  return data;
}

const UserService = { getUser, addRemoveFriend };

export default UserService;
