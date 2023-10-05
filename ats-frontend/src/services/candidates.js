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
  const response = await axios.post(baseUrl, newCandidate);
  return response.data;
};

export default {
  getAll,
  setToken,
  create,
};
