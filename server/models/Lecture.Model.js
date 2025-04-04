const LectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    contentType: { type: String, enum: ["video", "pdf", "text"], required: true },
    contentUrl: { type: String, required: true }, // Video URL / PDF Link
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model("Lecture", LectureSchema);
  