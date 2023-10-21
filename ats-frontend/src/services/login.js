import axios from "axios";

const baseUrl = "/api/login";
// local

// const baseUrl = "https://ats-backend.onrender.com/api/login";  fails

// const baseUrl = "https://ats-backend-dvrg.onrender.com/api/login"; // works

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
