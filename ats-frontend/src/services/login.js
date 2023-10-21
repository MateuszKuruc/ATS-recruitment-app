import axios from "axios";

// development mode
// const baseUrl = "/api/login";

//production mode
const baseUrl = "https://ats-backend-dvrg.onrender.com/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
