import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uploadCandidateFile } from "../../reducers/candidateReducer";
import { downloadFile } from "../../services/candidates";

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

const CandidateFiles = ({ candidate }) => {
  const dispatch = useDispatch();

  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    console.log("file in onFileChange", file);
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
        <div key={file.fileName}>
          <CloudDownloadIcon onClick={() => handleDownload(file.fileName)} />
        </div>
      ))}
    </div>
  );
};

export default CandidateFiles;
