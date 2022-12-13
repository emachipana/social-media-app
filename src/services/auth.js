import axios from "axios";

const baseUrl = "http://localhost:3001/auth"

const login = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/login`, credentials);
  return data;
}

const register = async (payload) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }

  const { data } = await axios.post(`${baseUrl}/register`, payload, config);
  return data;
}

const AuthService = { login, register };

export default AuthService;
