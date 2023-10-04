const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("candidates");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (password.length < 6) {
    response.status(400).json({
      error: "Password is too short",
    });
  }
  if (username.length < 4) {
    response.status(400).json({
      error: "Username is too short",
    });
  }
  if (!username || !password) {
    response.status(400).json({
      error: "Credentials error",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    password: passwordHash,
  });

  const savedUser = await User.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
