import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  dueDate: { type: Date, required: true },
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Submission" }],
}, { timestamps: true });

export default mongoose.model("Assignment", AssignmentSchema);
