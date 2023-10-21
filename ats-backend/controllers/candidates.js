const candidatesRouter = require("express").Router();
const Candidate = require("../models/candidate");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const upload = require("../utils/multerConfig");

candidatesRouter.get("/", async (request, response) => {
  const candidates = await Candidate.find({});
  response.json(candidates);
});

candidatesRouter.post("/", async (request, response) => {
  const body = await request.body;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken) {
      response.status(401).json({ error: "token invalid" });
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
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    response.status(500).json({ error: "Internal server error" });
  }
});

candidatesRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
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
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    response.status(500).json({ error: "Internal server error" });
  }
});

candidatesRouter.put("/:id", async (request, response) => {
  const candidate = request.body;

  const { id } = request.params;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken) {
      response.status(401).json({ error: "token invalid" });
    }

    const candidateToUpdate = await Candidate.findById(id);
    const user = await User.findById(decodedToken.id);

    if (user._id.toString() !== candidateToUpdate.user.toString()) {
      response
        .status(401)
        .json({ error: "No authorization to edit this candidate" });
    }

    if (!user) {
      response.status(400).json({ error: "User does not exist" });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      request.params.id,
      candidate,
      {
        new: true,
      }
    );

    response.json(updatedCandidate);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    response.status(500).json({ error: "Internal server error" });
  }
});

candidatesRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  const candidate = await Candidate.findById(id);
  response.json(candidate);
});

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

candidatesRouter.post(
  "/upload/:id",
  upload.single("file"),
  async (request, response) => {
    try {
      const candidateId = request.params.id;

      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!decodedToken) {
        response.status(401).json({ error: "token invalid" });
      }

      const candidate = await Candidate.findById(candidateId);
      const user = await User.findById(decodedToken.id);

      if (user._id.toString() !== candidate.user.toString()) {
        response
          .status(401)
          .json({ error: "No authorization to edit this candidate" });
      }

      if (!user) {
        response.status(400).json({ error: "User does not exist" });
      }

      if (!request.file) {
        return response.status(400).json({ error: "No file uploaded" });
      }
      if (!candidate) {
        return response.status(404).json({ error: "Candidate not found" });
      }

      const fileName = request.file.originalname;
      const uploadDate = new Date().toISOString();

      const params = {
        Bucket: process.env.BUCKET,
        Key: fileName,
        Body: request.file.buffer,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          if (process.env.NODE_ENV === "development") {
            console.error(err);
          }
          response.status(500).json({ error: "Error uploading to S3" });
        } else {
          candidate.uploadedFiles = candidate.uploadedFiles.concat({
            fileName,

            uploadDate,
          });

          candidate.save();

          return response.json(candidate);
        }
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
      response.status(500).json({ error: "Internal server error" });
    }
  }
);

candidatesRouter.get("/download/:filename", async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken) {
      response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      response.status(400).json({ error: "User does not exist" });
    }

    const fileName = request.params.filename;

    const s3Url = `https://${process.env.BUCKET}.s3.${process.env.REGION}.amazonaws.com/${fileName}`;

    response.json({ downloadUrl: s3Url });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error during file download", error);
    }
    response.status(500).json({ error: "Internal server error" });
  }
});

candidatesRouter.delete("/delete/:id/:fileName", async (request, response) => {
  const { id, fileName } = request.params;

  try {
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return response.status(404).json({ error: "Candidate not found" });
    }

    const updatedFiles = candidate.uploadedFiles.filter(
      (file) => file.fileName !== fileName
    );

    candidate.uploadedFiles = updatedFiles;

    await candidate.save();

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: process.env.BUCKET,
      Key: fileName,
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error deleting file from S3:", err);
        }
        response.status(500).json({ error: "Internal server error" });
      } else {
        if (process.env.NODE_ENV === "development") {
          console.log("File deleted from S3:", data);
        }
        return response.json(candidate);
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = candidatesRouter;
