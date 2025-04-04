const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    dueDate: { type: Date, required: true },
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Submission" }],
  }, { timestamps: true });
  
  module.exports = mongoose.model("Assignment", AssignmentSchema);
  