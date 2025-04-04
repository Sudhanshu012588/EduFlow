const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "faculty", "student"], required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Only for students
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Only for faculty
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
