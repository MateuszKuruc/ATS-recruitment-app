import { useDispatch } from "react-redux";
import { setLogin } from "../../reducers/loginReducer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setNotification } from "../../reducers/notificationReducer";
import styled from "styled-components";
import AnimatedPage from "../Layout/AnimatedPage";

const MainContainer = styled.div`
  padding: 5rem;
  padding-top: 1rem;
  background-color: #ebcbf4;
  flex: 1;
  margin-bottom: 1rem;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const InnerContainer = styled.div`
  margin-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const HeaderTypography = styled(Typography)`
  padding-bottom: 1rem;
`;

const BodyTypography = styled(Typography)`
  && {
    padding-bottom: 1rem;
    @media (max-width: 768px) {
      padding: 0rem;
      margin-bottom: 1rem;
    }
  }
`;

const TopContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 0rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
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
    <AnimatedPage>
      <MainContainer>
        <TopContainer>
          <Typography variant="italic3">
            You have been successfully logged out. Please note that you
            <strong>
              {" "}
              will not be able to use dashboard before logging in.{" "}
            </strong>
            The key functionalities of the ATS application are user-oriented and
            require an active account. If you want to log in again,{" "}
            <Link to="/login">click here.</Link>
          </Typography>
        </TopContainer>
        <InnerContainer>
          <HeaderTypography variant="h5">
            Wish to leave feedback?
          </HeaderTypography>
          <BodyTypography variant="body1">
            Don't hesitate to let me know about the user experience, so I can
            provide further quality of life improvements to the application. If
            there are particular parts of the app that you enjoy, share your
            thoughts, too! Please use{" "}
            <Link to="/feedback">
              <em>this link</em>
            </Link>
            .
          </BodyTypography>
          <HeaderTypography variant="h5">
            Not sure how the ATS can help you?
          </HeaderTypography>
          <BodyTypography variant="body1">
            {" "}
            Visit the{" "}
            <Link to="/tips">
              <em>tips</em>
            </Link>{" "}
            tab and read about uses of Applicant Tracking Systems in the
            recruitment industry.
          </BodyTypography>
          <HeaderTypography variant="h5">More questions?</HeaderTypography>
          <BodyTypography>
            {" "}
            Please check FAQ section{" "}
            <Link to="/faq">
              <em>here</em>
            </Link>
            .
          </BodyTypography>
        </InnerContainer>
      </MainContainer>
    </AnimatedPage>
  );
};

export default LogoutPage;
