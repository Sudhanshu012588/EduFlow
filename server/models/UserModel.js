import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "faculty", "student"], required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
}, { timestamps: true });
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Skip if password is not modified

    console.log("Hashing password:", this.password); // Debugging

    try {
        this.password = await bcrypt.hash(this.password, 12);
        console.log("Hashed password:", this.password); // Debugging
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
});
export default mongoose.model("User", UserSchema);
