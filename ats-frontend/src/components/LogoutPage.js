import { useDispatch } from "react-redux";
import { setLogin } from "../reducers/loginReducer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const LogoutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.localStorage.removeItem("loggedAppUser");
    dispatch(setLogin(null));
  }, [dispatch]);

  return (
    <div>
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
