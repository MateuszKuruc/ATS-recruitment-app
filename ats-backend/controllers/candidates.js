const candidatesRouter = require("express").Router();
const Candidate = require("../models/candidate");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

candidatesRouter.get("/", async (request, response) => {
  const candidates = await Candidate.find({}).populate("user");
  response.json(candidates);
});

candidatesRouter.post("/", async (request, response) => {
  const { body } = request;

  // const decodedToken = jwt.verify(request.token)

  const candidate = new Candidate({
    firstName: body.firstName,
    lastName: body.lastName,
    location: body.location,
    firstContact: body.firstContact,
    email: body.email,
    phone: body.phone,
    skill: body.skill,
    seniority: body.seniority,
    assessment: null,
    notice: null,
    language: null,
    contract: null,
    notes: null,
  });

  const savedCandidate = await candidate.save();
  savedCandidate.populate("user");
  // User.candidates = user.candidates.concat(savedCandidate);
  // await user.save();

  response.json(savedCandidate);
});

module.exports = candidatesRouter;
