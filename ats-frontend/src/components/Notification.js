import { Alert, AlertTitle } from "@mui/material";

const Notification = ({ severity, message }) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>{severity}</AlertTitle>
      {message}
    </Alert>
  );
};

export default Notification;
