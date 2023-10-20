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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

candidatesRouter.get("/:id", async (request, response) => {
  const { id } = request.params;

  const candidate = await Candidate.findById(id);
  response.json(candidate);
});

// AWS

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
      // const filePath = request.file.path;
      const uploadDate = new Date().toISOString();

      //new
      const params = {
        Bucket: process.env.BUCKET,
        Key: fileName,
        Body: request.file.buffer,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
          response.status(500).json({ error: "Error uploading to S3" });
        } else {
          console.log("File uploaded to S3");
          // response.status(200).json({ message: "File uploaded successfully" });
          candidate.uploadedFiles = candidate.uploadedFiles.concat({
            fileName,
            // filePath,
            uploadDate,
          });

          candidate.save();

          response.status(200).json({ message: "File uploaded successfully" });
        }
      });
    } catch (error) {
      console.error(error);
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
    console.error("Error during file download", error);
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

    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

// candidatesRouter.post(
//   "/upload/:id",
//   upload.single("file"),
//   async (request, response) => {
//     try {
//       const candidateId = request.params.id;

//       const decodedToken = jwt.verify(request.token, process.env.SECRET);
//       if (!decodedToken) {
//         response.status(401).json({ error: "token invalid" });
//       }

//       const candidate = await Candidate.findById(candidateId);
//       const user = await User.findById(decodedToken.id);

//       if (user._id.toString() !== candidate.user.toString()) {
//         response
//           .status(401)
//           .json({ error: "No authorization to edit this candidate" });
//       }

//       if (!user) {
//         response.status(400).json({ error: "User does not exist" });
//       }

//       if (!request.file) {
//         return response.status(400).json({ error: "No file uploaded" });
//       }
//       const fileName = request.file.originalname;
//       const filePath = request.file.path;
//       const uploadDate = new Date().toISOString();

//       if (!candidate) {
//         return response.status(404).json({ error: "Candidate not found" });
//       }

//       candidate.uploadedFiles = candidate.uploadedFiles.concat({
//         fileName,
//         filePath,
//         uploadDate,
//       });

//       await candidate.save();

//       response.status(200).json({ message: "File uploaded successfully" });
//     } catch (error) {
//       console.error(error);
//       response.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// candidatesRouter.get("/download/:filename", async (request, response) => {
//   try {
//     const decodedToken = jwt.verify(request.token, process.env.SECRET);
//     if (!decodedToken) {
//       response.status(401).json({ error: "token invalid" });
//     }

//     const user = await User.findById(decodedToken.id);

//     if (!user) {
//       response.status(400).json({ error: "User does not exist" });
//     }

//     const fileName = request.params.filename;
//     const filePath = path.join(__dirname, "../uploads", fileName);

//     response.download(filePath, fileName, (err) => {
//       if (err) {
//         response.status(404).send("File not found");
//       }
//     });
//   } catch (error) {
//     console.error("Error during file download", error);
//     response.status(500).json({ error: "Internal server error" });
//   }
// });

// candidatesRouter.delete("/delete/:id/:fileName", async (request, response) => {
//   const { id, fileName } = request.params;

//   try {
//     const candidate = await Candidate.findById(id);

//     if (!candidate) {
//       return response.status(404).json({ error: "Candidate not found" });
//     }

//     const updatedFiles = candidate.uploadedFiles.filter(
//       (file) => file.fileName !== fileName
//     );

//     candidate.uploadedFiles = updatedFiles;

//     await candidate.save();

//     response.status(204).end();
//   } catch (error) {
//     console.error(error);
//     response.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = candidatesRouter;
