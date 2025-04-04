const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
  }, { timestamps: true });
  
  module.exports = mongoose.model("Course", CourseSchema);
  