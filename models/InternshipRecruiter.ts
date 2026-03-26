import mongoose from "mongoose";

const InternshipRecruiterSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Please provide a full name"] },
    email: { type: String, required: [true, "Please provide an email"], unique: true },
    password: { type: String, required: [true, "Please provide a password"] },
    companyName: { type: String, required: [true, "Please provide a company name"] },
  },
  { timestamps: true }
);

export default
  mongoose.models.InternshipRecruiter ||
  mongoose.model("InternshipRecruiter", InternshipRecruiterSchema);
