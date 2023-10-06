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

  console.log(
    "config",
    config,
    "new candidate:",
    newCandidate,
    "token id",
    token.id
  );
  try {
    const response = await axios.post(baseUrl, newCandidate, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("error while making POST request:", error);
  }
};

export default {
  getAll,
  setToken,
  create,
};
