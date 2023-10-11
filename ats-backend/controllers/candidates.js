const candidatesRouter = require("express").Router();
const Candidate = require("../models/candidate");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const upload = require("../utils/multerConfig");
const path = require("path");

candidatesRouter.get("/", async (request, response) => {
  const candidates = await Candidate.find({});
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
    edit: "",
    uploadedFiles: [],
  });

  const savedCandidate = await candidate.save();

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
  const user = await User.findById(decodedToken.id);

  if (user._id.toString() !== candidate.user.toString()) {
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
  );

  response.json(updatedCandidate);
});

candidatesRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  const candidate = await Candidate.findById(id);
  response.json(candidate);
});

candidatesRouter.post(
  "/upload/:id",
  upload.single("file"),
  async (request, response) => {
    try {
      const candidateId = request.params.id;
      if (!request.file) {
        return response.status(400).json({ error: "No file uploaded" });
      }
      const fileName = request.file.originalname;
      // const fileName = Date.now() + "-" + request.file.originalname;

      const filePath = request.file.path;
      const uploadDate = new Date().toISOString();

      console.log(
        "backend details",
        "FILENAME:",
        fileName,
        "FILEPATH:",
        filePath,
        "UPLOADDATE:",
        uploadDate
      );

      const candidate = await Candidate.findById(candidateId);

      if (!candidate) {
        return response.status(404).json({ error: "Candidate not found" });
      }

      candidate.uploadedFiles = candidate.uploadedFiles.concat({
        fileName,
        filePath,
        uploadDate,
      });

      console.log("candidate backend", candidate);

      await candidate.save();

      response.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

candidatesRouter.get("/download/:filename", (request, response) => {
  const fileName = request.params.filename;
  const filePath = path.join(__dirname, "../uploads", fileName);

  response.download(filePath, fileName, (err) => {
    if (err) {
      console.log("File does not exist:", err);
      response.status(404).send("File not found");
    }
  });
});

module.exports = candidatesRouter;
