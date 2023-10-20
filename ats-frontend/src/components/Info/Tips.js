import AnimatedPage from "../Layout/AnimatedPage";
import styled from "styled-components";
import { Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  background-color: #ebcbf4;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 1rem;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Intro = styled.div`
  && {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const StyledPaper = styled(Paper)`
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #25283d;
  padding: 2rem;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const HeaderTypography = styled(Typography)`
  color: #ffba49;
`;

const TipsTab = () => {
  return (
    <AnimatedPage>
      <MainContainer>
        <Header>
          <HeaderTypography variant="h4">TIPS</HeaderTypography>
        </Header>
        <Intro>
          <Typography variant="body1">
            This short guide aims to help you successfully navigate the
            application and make the best use of it. Remember that the main
            functionalities are available upon logging in.
          </Typography>
        </Intro>
        <Content>
          <StyledPaper>
            <Typography variant="h6">Candidate profile actions</Typography>
            <ul>
              <Typography variant="body1">
                <li>
                  <strong>Add new candidate:</strong> Navigate to "Form" tab,
                  fill out all the fields and click "Add profile". If there
                  aren't any validation errors, the profile of the candidate is
                  created.
                </li>
                <li>
                  <strong>Show all candidates:</strong> Open "Profiles" tab to
                  display all candidates connected with your account. You can
                  sort the data by clicking on the header name or three dot icon
                  to access filtering menu.
                </li>
                <li>
                  <strong>Add meeting feedback:</strong> Open candidate profile
                  (either use search bar in the navigation menu or find the
                  candidate in the list) and click "Provide feedback". Choose
                  appropriate options from drop down menu, add written notes and
                  click "Submit" to add feedback or "Cancel" if you want to
                  abort changes.
                </li>
                <li>
                  <strong>Edit candidate profile:</strong> Open candidate
                  profile and click "Edit". Modify the fields you want to change
                  and click "Save" to keep them, or "Cancel" if you want to
                  abort changes.
                </li>
                <li>
                  <strong>Show the best profiles:</strong> Go to "Hot" tab,
                  which displays candidates with the best assessment grade (set
                  during meeting feedback stage).
                </li>
              </Typography>
            </ul>
          </StyledPaper>
          <StyledPaper>
            <Typography variant="h6">Statistics and technologies</Typography>
            <ul>
              <Typography variant="body1">
                <li>
                  <strong>Show all technologies:</strong> Open "Pools" tab and
                  choose a tile with the name of technology you are interested
                  in.
                </li>
                <li>
                  <strong>Show statistics per technology:</strong> Click on
                  technology name in "Pools tab" to display additional
                  information. The page includes details e.g. on candidates'
                  most popular location, seniority and earliest availability.
                  Click on "Show more" button next to category to display tab
                  data. From there, you can also access individual candidate's
                  profile by clicking their name.
                </li>
              </Typography>
            </ul>
          </StyledPaper>
          <StyledPaper>
            <Typography variant="h6">User actions</Typography>
            <ul>
              <Typography variant="body1">
                <li>
                  <strong>Log in:</strong> Open "Login" tab and enter account
                  credentials, click "log in" and await login confirmation.
                </li>
                <li>
                  <strong>Log out:</strong> Click on user icon in navigation
                  menu and choose "Logout".
                </li>
                <li>
                  <strong>Share feedback:</strong> Click on "Feedback" button in
                  navigation menu on follow instructions.
                </li>
                <li>
                  <strong>Get help:</strong> Click on "Help" button in
                  navigation menu and follow instructions.
                </li>
              </Typography>
            </ul>
          </StyledPaper>
        </Content>{" "}
        <Typography variant="italic">
          In case of further questions, please refer to{" "}
          <Link to="/help">Help</Link> or <Link to="/feedback">Feedback</Link>{" "}
          tabs.
        </Typography>
      </MainContainer>
    </AnimatedPage>
  );
};

export default TipsTab;
