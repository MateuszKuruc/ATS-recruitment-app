import { Alert, AlertTitle } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeNotification } from "../reducers/notificationReducer";
import styled from "styled-components";

const StyledAlert = styled(Alert)`
  && {
    margin-top: 1rem;
  }
`;

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
    <StyledAlert severity={severity}>
      <AlertTitle>{severity}</AlertTitle>
      {message}
    </StyledAlert>
  );
};

export default Notification;
