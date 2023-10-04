const candidatesRouter = require("express").Router();
const Candidate = require("../models/candidate");
const User = require("../models/user");

candidatesRouter.get("/", async (request, response) => {
  const candidates = await Candidate.find({}).populate("user");
  response.json(candidates);
});

module.exports = candidatesRouter;
