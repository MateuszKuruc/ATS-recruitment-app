import axios from "axios";

// development mode
// const baseUrl = "/api/candidates";

// production mode
const baseUrl = "https://ats-backend-dvrg.onrender.com/api/candidates";

const generateUniqueFilename = (originalFilename) => {
  const timestamp = new Date().getTime();

  const filenameSplit = originalFilename.split(".");
  const fileExtension = filenameSplit.pop();
  const baseFilename = filenameSplit.join(".");

  const uniqueFilename = `${baseFilename}-${timestamp}.${fileExtension}`;

  return uniqueFilename;
};

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

    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("error while making POST request:", error);
    }
  }
};

export const getById = async (id) => {
  const config = {
    header: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

const deleteCandidateById = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);

    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("error while making DELETE request", error);
    }
  }
};

const updateCandidateById = async (updatedCandidate) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.put(
      `${baseUrl}/${updatedCandidate.id}`,
      updatedCandidate,
      config
    );

    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("error while making PUT request", error);
    }
  }
};

const uploadFile = async (id, file) => {
  const formData = new FormData();

  const uniqueFilename = generateUniqueFilename(file.name);
  const fileBlob = new Blob([file], { type: file.type });
  const uniqueFile = new File([fileBlob], uniqueFilename, { type: file.type });

  formData.append("file", uniqueFile);

  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/upload/${id}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error while uploading file:", error);
    }
  }
};

const downloadFile = async (fileName) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await axios.get(`${baseUrl}/download/${fileName}`, config);
    const s3Url = response.data.downloadUrl;

    window.open(s3Url, "_blank");

    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error while downloading file:", error);
    }
    return false;
  }
};

const deleteFile = async (id, fileName) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.delete(
      `${baseUrl}/delete/${id}/${fileName}`,
      config
    );

    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error while deleting file", error);
    }
  }
};

export default {
  getAll,
  setToken,
  create,
  getById,
  deleteCandidateById,
  updateCandidateById,
  uploadFile,
  downloadFile,
  deleteFile,
};
