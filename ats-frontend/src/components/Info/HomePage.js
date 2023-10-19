import AnimatedPage from "../Layout/AnimatedPage";
import styled from "styled-components";
import { Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  background-color: #ebcbf4;
  flex: 1;
  margin-bottom: 1rem;
  padding: 2rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0rem;
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
  color: #ffffff;
`;

const HeaderCaption = styled(Typography)`
  color: #ffba49;
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const BottomContainer = styled.div`
  margin-top: 1rem;
  background-color: #ffba49;
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-radius: 0.5rem;
`;

const HomePage = () => {
  const title =
    window.innerWidth <= 768
      ? "ATS FOR IT RECRUITERS"
      : "APPLICANT TRACKING SYSTEM FOR IT RECRUITERS";

  return (
    <AnimatedPage>
      <MainContainer>
        <Header>
          <HeaderTypography variant="h4">{title}</HeaderTypography>
          <HeaderCaption variant="italic3" style={{ color: "#FFBA49" }}>
            Get your pipeline under control!
          </HeaderCaption>
        </Header>
        <Typography variant="body1">
          <p>
            ATS is a valuable tool in the recruiter's arsenal, allowing
            intuitive data storage, feedback management and status control.
          </p>
          <p>
            The application was deisgned <em>specifically</em> with IT sector
            recruitment in mind. It is reflected in the field types of the
            candidate profile, technologies in pools section and job titles.
          </p>
        </Typography>
        <StyledPaper>
          <Typography variant="h6">Core features:</Typography>

          <Typography variant="body1">
            <ul>
              <li>Add new candidate profile with basic details</li>
              <li>Provide written feedback after the meeting with candidate</li>
              <li>Upload and delete candidate CV</li>
              <li>Update or remove candidate profiles</li>
              <li>Display and sort the list of all candidates</li>
              <li>Show the list of 'hot' profiles based on assessment score</li>
              <li>Show pools with division based on technologies</li>
              <li>Display basic statistics about each pool</li>
            </ul>
          </Typography>
        </StyledPaper>
        <Typography variant="italic">
          For more details visit the <Link to="/tips">Tips</Link> and{" "}
          <Link to="/faq">FAQ</Link> tabs. To leave feedback, visit{" "}
          <Link to="userfeedback">Feedback</Link> tab.
        </Typography>
        <BottomContainer>
          <Typography variant="h4">ENJOY!</Typography>
        </BottomContainer>
      </MainContainer>
    </AnimatedPage>
  );
};

export default HomePage;
