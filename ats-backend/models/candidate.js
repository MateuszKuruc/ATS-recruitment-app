const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  location: String,
  firstContact: String,
  email: String,
  phone: String,
  skill: String,
  seniority: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

candidateSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Candidate", candidateSchema);

