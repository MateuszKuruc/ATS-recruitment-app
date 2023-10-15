import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uploadCandidateFile } from "../../reducers/candidateReducer";
import { deleteCandidateFile } from "../../reducers/candidateReducer";
import candidateService from "../../services/candidates";
import { setNotification } from "../../reducers/notificationReducer";
import { useState } from "react";
import { getById } from "../../services/candidates";

import {
  PictureAsPdf,
  Delete as DeleteIcon,
  Description,
} from "@mui/icons-material";

import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

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

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0;
    background-color: white;
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 0;
  
  }
`;

const IconContainer = styled.div`
border-radius: 0,
gap: 1.5rem
`;

const CandidateFiles = ({ candidate }) => {
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFiles] = useState(candidate.uploadedFiles);
  const [openDialog, setOpenDialog] = useState(false);

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
    setOpenDialog(false);
  };

  const openDialogWindow = () => {
    setOpenDialog(true);
  };

  const closeDialogWindow = () => {
    setOpenDialog(false);
  };

  if (!candidate) {
    return null;
  }

  return (
    <Container>
      <StyledButton
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
      </StyledButton>
      {uploadedFiles.map((file) => (
        <div
          style={{
            gap: "0rem",
            display: "flex",
            flexDirection: "column",
          }}
          key={file.fileName}
        >
          <IconContainer>
            <IconButton onClick={() => handleDownload(file.fileName)}>
              {file.fileName.includes(".pdf") ? (
                <PictureAsPdf color="secondary" fontSize="large" />
              ) : (
                <Description fontSize="large" color="info" />
              )}
            </IconButton>
            <IconButton onClick={() => openDialogWindow()}>
              <DeleteIcon fontSize="large" color="primary" />
            </IconButton>
          </IconContainer>
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
          <Dialog
            open={openDialog}
            onClose={closeDialogWindow}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete file?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action will delete the file from database. Deleting a file
                is irreversible.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(file.fileName)}
              >
                <Typography variant="h6">Confirm</Typography>
              </Button>
              <Button variant="outlined" onClick={closeDialogWindow} autoFocus>
                <Typography variant="h6">Cancel</Typography>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}
    </Container>
  );
};

export default CandidateFiles;
