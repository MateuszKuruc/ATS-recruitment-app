import { useDispatch } from "react-redux";
import { setLogin } from "../reducers/loginReducer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";
import { useSelector } from "react-redux";

const LogoutPage = () => {
  const dispatch = useDispatch();
  // const notification = useSelector((state) => state.notification);

  useEffect(() => {
    window.localStorage.removeItem("loggedAppUser");
    dispatch(setLogin(null));
    dispatch(
      setNotification({
        severity: "success",
        message: "You were logged out successfully!",
      })
    );
  }, [dispatch]);

  return (
    <div>
      {/* <Notification
        severity={notification.severity}
        message={notification.message}
      /> */}
      <Typography variant="italic">
        <p>
          You have been successfully logged out. Please note that you
          <b> will not be able to use dashboard before logging in. </b>The key
          functionalities of the ATS application are user-oriented and require
          an active account.
        </p>
        <p>
          If you want to log in again, <Link to="/login">click here.</Link>
        </p>
      </Typography>
    </div>
  );
};

export default LogoutPage;
