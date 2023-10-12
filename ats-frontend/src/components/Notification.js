import { Alert, AlertTitle } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../reducers/notificationReducer";

const Notification = ({ severity, message }) => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.message) {
      const notificationTimer = setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);

      return () => clearTimeout(notificationTimer);
    }
  }, [notification, dispatch]);

  return (
    <Alert severity={severity}>
      <AlertTitle>{severity}</AlertTitle>
      {message}
    </Alert>
  );
};

export default Notification;
