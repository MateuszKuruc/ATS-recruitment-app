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

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken) {
    response.status(401).json({ error: "token invalid" })
  }

  const user = await User.findById(decodedToken.id);

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
    user: user.id
  });

  const savedCandidate = await candidate.save();
  savedCandidate.populate("user");
  user.candidates = user.candidates.concat(savedCandidate);
  await user.save();

  response.json(savedCandidate);
});



candidatesRouter.put("/:id", async (request, response) => {
  const candidate = request.body;

  const updatedCandidate = await Candidate.findByIdAndUpdate(
    request.params.id,
    candidate,
    {
      new: true,
    }
  ).populate("user");

  response.json(updatedCandidate);
});

module.exports = candidatesRouter;
