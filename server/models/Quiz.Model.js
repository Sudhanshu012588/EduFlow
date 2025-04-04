import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
}, { timestamps: true });

export default mongoose.model("Quiz", QuizSchema);
