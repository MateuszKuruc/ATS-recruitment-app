import { Typography, Button } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

const MainContainer = styled.div`
  background-color: #ebcbf4;
  flex: 1;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

const SingleBlock = styled.div`
  // display: flex;
  // flex-direction: column;
  // border: 1px solid blue;
`;

const QuestionContainer = styled.div`
  display: flex;
  // border: 1px solid red;
  // flex: 1;
  justify-content: space-between;
  padding: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const StyledButton = styled(Button)``;

const InfoTab = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  const answerShown = { display: showAnswer ? "block" : "none" };

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
  ];

  return (
    <MainContainer>
      <Typography variant="h1">FAQ</Typography>
      {content.map((c) => (
        <SingleBlock key={c.id}>
          <QuestionContainer>
            <Typography variant="h4">{c.question}</Typography>
            <StyledButton variant="contained" color="secondary">
              Show answer
            </StyledButton>
          </QuestionContainer>
          <Typography variant="body1">{c.answer}</Typography>
        </SingleBlock>
      ))}

      {/* <SingleBlock>
        <Typography variant="h5">1. What is an ATS?</Typography>
        <Typography variant="body1">
          <p>
            ATS stands for <em>Applicant Tracking System</em> and the term
            describes an automated tool for storing candidates' profiles with
            details such as name, address, resume, skills, summary etc.
            Typically such tools are used by recruitment agencies and most of
            the companies that have their own recruitment branch.
          </p>
        </Typography>
      </SingleBlock> */}
      {/* <SingleBlock>
        <Typography variant="h5">Q</Typography>
        <Typography variant="body1">
          <p>A</p>
        </Typography>
      </SingleBlock>
      <SingleBlock>
        <Typography variant="h5">Q</Typography>
        <Typography variant="body1">
          <p>A</p>
        </Typography>
      </SingleBlock>
      <SingleBlock>
        <Typography variant="h5">Q</Typography>
        <Typography variant="body1">
          <p>A</p>
        </Typography>
      </SingleBlock>
      <SingleBlock>
        <Typography variant="h5">Q</Typography>
        <Typography variant="body1">
          <p>A</p>
        </Typography>
      </SingleBlock>
      <SingleBlock>
        <Typography variant="h5">Q</Typography>
        <Typography variant="body1">
          <p>A</p>
        </Typography>
      </SingleBlock>
      <SingleBlock>
        <Typography variant="h5">Q</Typography>
        <Typography variant="body1">
          <p>A</p>
        </Typography>
      </SingleBlock> */}
    </MainContainer>
  );
};

export default InfoTab;

<div>
  <h1>FAQ</h1>
  <p>
    If you are facing any issues with the app or have some questions, you might
    want to read the list of frequently asked questions below.
  </p>
  <h3>1. What is an ATS?</h3>
  <p>
    ATS stands for{" "}
    <b>
      <i>Applicant Tracking System</i>
    </b>{" "}
    and it is an automated tool for storing candidates' profiles with details
    such as name, address, resume, skills, summary etc. Typically such tools are
    used by recruitment agencies and most of the companies that have their own
    recruitment branch.
  </p>
  <h3>2. How can I create an account?</h3>
  <p>
    In its current version, the application only offers access to the demo mode
    with the ready-made account. Credentials and login instructions can be found
    in the README file on GitHub.
  </p>
  <h3>3. Can I use this ATS app for free?</h3>
  <p>
    Yes, this is a completely free application that offers help in handling
    day-to-day activities typical of recruiter's work.
  </p>
</div>;
