import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Button, Typography, IconButton } from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uploadCandidateFile } from "../../reducers/candidateReducer";
import { downloadFile } from "../../services/candidates";

import { setNotification } from "../../reducers/notificationReducer";

import {
  PictureAsPdf,
  Delete as DeleteIcon,
  Description,
} from "@mui/icons-material";

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

  const onFileChange = (e) => {
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
      dispatch(
        setNotification({
          severity: "success",
          message: "File uploaded successfuly!",
        })
      );
      dispatch(uploadCandidateFile(candidate.id, file));
    } catch (error) {
      dispatch(
        setNotification({
          severity: "error",
          message: "Error uploading the file. Please try again",
        })
      );
    }
  };

  const handleDownload = (fileName) => {
    console.log("file name in handledownload", fileName);
    downloadFile(fileName);
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
      {candidate.uploadedFiles.map((file) => (
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
            <IconButton>
              {file.fileName.includes(".pdf") ? (
                <PictureAsPdf color="secondary" fontSize="large" />
              ) : (
                <Description fontSize="large" color="info" />
              )}
            </IconButton>
            <IconButton>
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
