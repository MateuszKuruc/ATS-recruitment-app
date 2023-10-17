import { useDispatch } from "react-redux";
import { setLogin } from "../reducers/loginReducer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setNotification } from "../reducers/notificationReducer";
import styled from "styled-components";

const MainContainer = styled.div`
  padding: 5rem;
  padding-top: 1rem;
`;

const InnerContainer = styled.div`
  margin-top: 2rem;
`;

const HeaderTypography = styled(Typography)`
  padding-bottom: 1rem;
`;

const BodyTypography = styled(Typography)`
  padding-bottom: 1rem;
`;

const LogoutPage = () => {
  const dispatch = useDispatch();

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
    <MainContainer>
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
      <InnerContainer>
        <HeaderTypography variant="h5">
          Wish to leave feedback?
        </HeaderTypography>
        <BodyTypography variant="body1">
          Don't hesitate to let me know about the user experience, so I can
          provide further quality of life improvements to the application. If
          there are particular parts of the app that you enjoy, share your
          thoughts, too!
        </BodyTypography>
        <HeaderTypography variant="h5">
          Not sure how the ATS can help you?
        </HeaderTypography>
        <BodyTypography variant="body1">
          Visit the <Link to="/">home page</Link> and read about uses of
          Applicant Tracking Systems in the recruitment industry.
        </BodyTypography>
        <HeaderTypography variant="h5">
          Not sure how the ATS can help you?
        </HeaderTypography>
      </InnerContainer>
    </MainContainer>
  );
};

export default LogoutPage;
