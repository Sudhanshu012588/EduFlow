const SubmissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    fileUrl: { type: String, required: true }, // File storage link
    submittedAt: { type: Date, default: Date.now },
    grade: { type: Number, default: null }, // Faculty grades it later
    feedback: { type: String, default: "" },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Submission", SubmissionSchema);
  