import axios from "axios";

const baseUrl = "/api/candidates";

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

const updateCandidateById = async (updatedCandidate) => {
  try {
    const response = await axios.put(
      `${baseUrl}/${updatedCandidate.id}`,
      updatedCandidate
    );

    return response.data;
  } catch (error) {
    console.error("error while making PUT request", error);
  }
};

const uploadFile = async (id, file) => {
  const formData = new FormData();

  const uniqueFilename = generateUniqueFilename(file.name);

  const fileBlob = new Blob([file], { type: file.type });

  const uniqueFile = new File([fileBlob], uniqueFilename, { type: file.type });

  console.log("unique file", uniqueFile);

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
    console.error("Error while uploading file:", error);
  }
};

export const downloadFile = async (fileName) => {
  try {
    const response = await axios.get(`${baseUrl}/download/${fileName}`, {
      responseType: "blob",
      headers: {
        Authorization: token,
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error while downloading file:", error);
  }
};

const deleteFile = async (id, fileName) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete/${id}/${fileName}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while deleting file", error);
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
  // downloadFile,
  deleteFile,
};
