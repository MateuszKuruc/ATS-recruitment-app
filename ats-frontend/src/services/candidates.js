import axios from "axios";

const baseUrl = "/api/candidates";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newCandidate) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newCandidate, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("error while making POST request:", error);
  }
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const deleteCandidateById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("config in candidate service", config);

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);

    return response.data;
  } catch (error) {
    console.error("error while making DELETE request", error);
  }
};

export default {
  getAll,
  setToken,
  create,
  getById,
  deleteCandidateById,
};
