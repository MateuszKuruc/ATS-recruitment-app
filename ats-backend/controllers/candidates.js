const candidatesRouter = require("express").Router();

candidatesRouter.get("/", async (request, response) => {
  const candidates = await Candidate.find({}).populate("user");
  response.json(candidates);
});

module.exports = candidatesRouter;
