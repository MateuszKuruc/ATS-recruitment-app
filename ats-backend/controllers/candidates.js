const candidatesRouter = require("express").Router();
const Candidate = require("../models/candidate");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

candidatesRouter.get("/", async (request, response) => {
  const candidates = await Candidate.find({}).populate("user");
  response.json(candidates);
});

candidatesRouter.post("/", async (request, response) => {
  const body = await request.body;

  console.log("body:", body, "request token:", request.token);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken) {
    response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  console.log("user", user);
  const candidate = new Candidate({
    firstName: body.firstName,
    lastName: body.lastName,
    location: body.location,
    firstContact: body.firstContact,
    email: body.email,
    phone: body.phone,
    skill: body.skill,
    seniority: body.seniority,
    assessment: "",
    notice: "",
    language: "",
    contract: "",
    notes: "",
    user: user._id,
  });

  const savedCandidate = await candidate.save();
  savedCandidate.populate("user");
  user.candidates = user.candidates.concat(savedCandidate);
  await user.save();

  response.json(savedCandidate);
});

candidatesRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken) {
    response.status(401).json({ error: "token invalid" });
  }

  const candidate = await Candidate.findById(id);
  const user = await User.findById(decodedToken);

  if (user.id.toString() !== candidate.user.toString()) {
    response
      .status(401)
      .json({ error: "No authorization to delete this candidate" });
  }

  if (!user) {
    response.status(400).json({ error: "User does not exist" });
  }

  await Candidate.findByIdAndRemove(id);
  response.status(204).end();
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

candidatesRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  const candidate = await Candidate.findById(id);
  response.json(candidate);
});

module.exports = candidatesRouter;
