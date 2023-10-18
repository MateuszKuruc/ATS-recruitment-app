import { Typography } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

const MainContainer = styled.div`
  background-color: #ebcbf4;
  flex: 1;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

const SingleBlock = styled.div``;

const InfoTab = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  const answerShown = { display: showAnswer ? "block" : "none" };

  const content = [
    {
      question: "1. What is an ATS?",
      answer:
        "ATS stands for Applicant Tracking System and the term describes an automated tool for storing candidates' profiles with details such as name, address, resume, skills, summary etc. Typically such tools are used by recruitment agencies and most of the companies that have their own recruitment branch.",
    },
    {
      question: "2. How can I create an account?",
      answer:
        "In its current version, the application only offers access to the demo mode with the ready-made account. Credentials and login instructions can be found in the README file on GitHub.",
    },
  ];

  return (
    <MainContainer>
      <Typography variant="h1">FAQ</Typography>
      <SingleBlock>
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
      </SingleBlock>
      <SingleBlock>
        <Typography variant="h5">Q</Typography>
        <Typography variant="body1">
          <p>A</p>
        </Typography>
      </SingleBlock>
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
