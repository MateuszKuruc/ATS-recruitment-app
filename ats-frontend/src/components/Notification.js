import { Alert, AlertTitle } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = ({ severity, message }) => {
 
  return (
    <Alert severity={severity}>
      <AlertTitle>{severity}</AlertTitle>
      {message}
    </Alert>
  );
};

export default Notification;
