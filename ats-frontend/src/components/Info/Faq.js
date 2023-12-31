import { Typography, Paper } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import AnimatedPage from "../Layout/AnimatedPage";

const MainContainer = styled.div`
  background-color: #ebcbf4;
  flex: 1;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const SingleBlock = styled.div``;

const QuestionContainer = styled.div`
  display: flex;
  background-color: #ffba49;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  padding: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    padding-top: 1rem;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 1rem;
  margin-bottom: 1rem;
`;

const TopHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #25283d;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }
`;

const HeaderTypography = styled(Typography)`
  color: #ffba49;
`;

const Faq = () => {
  const [selected, setSelected] = useState(null);

  const toggleSelected = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const content = [
    {
      question: "1. What is an ATS?",
      answer:
        "ATS stands for Applicant Tracking System and the term describes an automated tool for storing candidates' profiles with details such as name, address, resume, skills, summary etc. Typically such tools are used by recruitment agencies and most of the companies that have their own recruitment branch. This ATS app is adjusted to the recruitment for various positions within the IT sector.",
      id: 1,
    },
    {
      question: "2. How can I create an account?",
      answer:
        "In its current version, the application only offers access to the demo mode with the ready-made account. Credentials and login instructions can be found in the README file on GitHub.",
      id: 2,
    },
    {
      question: "3. Can I add new candidates?",
      answer:
        "Yes, you can add new candidate entries to database and they will immediately be accessible. Use 'Form' tab and fill the required fields.",
      id: 3,
    },
    {
      question: "4. Can I sort the list of candidates?",
      answer:
        "Yes, you can go to 'Profiles' tab, click on the three dots in given header (e.g. Name or Assessment) to open the sorting menu and set your own filters.",
      id: 4,
    },
    {
      question:
        "5. Can I see statistics or overview of candidates from one particular field?",
      answer:
        "Yes, check 'Pools' tab and choose the technology you are interested in. The stats include the most common location and seniority among candidates, as well as the candidates who are still lacking meeting feedback in their profile.",
      id: 5,
    },
    {
      question:
        "6. Can this app be used for candidates outside the IT industry?",
      answer:
        "It was designed specifically for the needs of a recruiter working in IT sector, so a lot of options are unique to this field.",
      id: 6,
    },
    {
      question: "7. How can I contact the author?",
      answer:
        "Please visit the 'Feedback' section to find details or just use the email: mateuszkuruc@gmail.com",
      id: 7,
    },
  ];

  return (
    <AnimatedPage style={{ border: "1px solid red" }}>
      <MainContainer>
        <TopHeader>
          <HeaderTypography variant="h4">FAQ</HeaderTypography>
        </TopHeader>

        {content.map((c, i) => (
          <SingleBlock key={i}>
            <QuestionContainer onClick={() => toggleSelected(i)}>
              <Typography variant="h6">{c.question}</Typography>
              <span>
                <Typography variant="h6">
                  {selected === i ? "-" : "+"}
                </Typography>
              </span>
            </QuestionContainer>
            <StyledPaper
              style={
                selected === i ? { display: "block" } : { display: "none" }
              }
            >
              <Typography variant="body1">{c.answer}</Typography>
            </StyledPaper>
          </SingleBlock>
        ))}
      </MainContainer>
    </AnimatedPage>
  );
};

export default Faq;
