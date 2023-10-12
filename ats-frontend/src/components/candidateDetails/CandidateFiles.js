import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uploadCandidateFile } from "../../reducers/candidateReducer";
import { downloadFile } from "../../services/candidates";

import { setNotification } from "../../reducers/notificationReducer";

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

    dispatch(uploadCandidateFile(candidate.id, file));
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
      }}
    >
      <Button
        component="label"
        variant="contained"
        color="secondary"
        startIcon={<CloudUploadIcon />}
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
        <div style={{ border: "1px solid green" }} key={file.fileName}>
          <CloudDownloadIcon onClick={() => handleDownload(file.fileName)} />

          <StyledTypography
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100px",
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
