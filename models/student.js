const mongoose = require("mongoose"); //For Schema
const { ObjectId } = mongoose.Schema;

var studentSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 40,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  branch: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: Number,
  },
  email: {
    type: String,
  },
  adhaarCard: {
    type: Number,
  },
  birthday: {
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  studentRef: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Student", studentSchema);
