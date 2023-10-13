import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Typography, IconButton } from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uploadCandidateFile } from "../../reducers/candidateReducer";
// import { downloadFile } from "../../services/candidates";
import candidateService from "../../services/candidates";

import { setNotification } from "../../reducers/notificationReducer";

import { useState } from "react";
import { getById } from "../../services/candidates";

import {
  PictureAsPdf,
  Delete as DeleteIcon,
  Description,
} from "@mui/icons-material";

import { deleteCandidateFile } from "../../reducers/candidateReducer";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledTypography = styled(Typography)`
  && {
  }
`;

const CandidateFiles = ({ candidate }) => {
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState(candidate.uploadedFiles);

  const onFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    if (candidate.uploadedFiles.length > 2) {
      dispatch(
        setNotification({
          severity: "warning",
          message:
            "Maximum of 3 files per candidate. Please remove one of the existing files before uploading a new file",
        })
      );

      return;
    }

    try {
      await dispatch(uploadCandidateFile(candidate.id, file));
      const response = await getById(candidate.id);
      setUploadedFiles(response.uploadedFiles);
      dispatch(
        setNotification({
          severity: "success",
          message: "File uploaded successfully!",
        })
      );
    } catch (error) {
      // try {
      //   dispatch(uploadCandidateFile(candidate.id, file)).then(() => {
      //     getById(candidate.id).then((response) => {
      //       console.log("response.data upload");
      //       setUploadedFiles(response.uploadedFiles);

      //     }).then(() => {
      //         dispatch(
      //             setNotification({
      //               severity: "success",
      //               message: "File uploaded successfully!",
      //             })
      //           );
      //     })
      //   });

      dispatch(
        setNotification({
          severity: "error",
          message: "Error uploading the file. Please try again",
        })
      );
    }
  };
  const handleDownload = async (fileName) => {
    const success = await candidateService.downloadFile(fileName);

    if (success) {
      dispatch(
        setNotification({
          severity: "success",
          message: "File downloading started",
        })
      );
    } else {
      dispatch(
        setNotification({
          severity: "error",
          message: "Error downloading the file. Please try again",
        })
      );
    }
  };

  const handleDelete = (fileName) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch(deleteCandidateFile(candidate.id, fileName))
        .then(() => {
          getById(candidate.id).then((response) => {
            setUploadedFiles(response.uploadedFiles);
          });

          dispatch(
            setNotification({
              severity: "success",
              message: "File deleted successfully!",
            })
          );
        })
        .catch((error) => {
          console.error(error);
          dispatch(
            setNotification({
              severity: "error",
              message: "Error deleting the file. Please try again",
            })
          );
        });
    }
  };

  if (!candidate) {
    return null;
  }

  return (
    <div
      style={{
        // border: "1px solid red",
        display: "flex",
        // flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Button
        component="label"
        variant="contained"
        color="secondary"
        startIcon={<CloudUploadIcon />}
        style={{ padding: "1rem" }}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          name="file_upload"
          accept=".pdf, .doc, .docx"
          onChange={onFileChange}
        />
      </Button>
      {uploadedFiles.map((file) => (
        <div
          style={{
            gap: "0rem",
            display: "flex",
            // border: "1px solid red",
            flexDirection: "column",
          }}
          key={file.fileName}
        >
          <div style={{ borderRadius: 0, gap: "1.5rem" }}>
            <IconButton onClick={() => handleDownload(file.fileName)}>
              {file.fileName.includes(".pdf") ? (
                <PictureAsPdf color="secondary" fontSize="large" />
              ) : (
                <Description fontSize="large" color="info" />
              )}
            </IconButton>
            <IconButton onClick={() => handleDelete(file.fileName)}>
              <DeleteIcon fontSize="large" color="primary" />
            </IconButton>
          </div>
          <StyledTypography
            variant="body1"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "7rem",
            }}
          >
            {file.fileName}
          </StyledTypography>
        </div>
      ))}
    </div>
  );
};

export default CandidateFiles;
