import axios from 'axios';

const API_URL = "https://localhost:7241/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password
  });
};

const login = (username, password) => {
  return axios.post(API_URL + "login", {
    username,
    password,
  })
  .then(response => {
    if (response.data && response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.token));
    }
    return response.data.token;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  logout
};

export default AuthService;