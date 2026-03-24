import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  // Company Overview
  companyName: { type: String, required: true },
  website: { type: String },
  postalAddress: { type: String },
  employees: { type: String },
  category: { type: String, default: "Software/IT" },

  // Job Details
  designation: { type: String },
  duration: { type: String },
  placeOfPosting: { type: String },
  jobDescription: { type: String },

  // Eligibility Criteria
  cgpa: { type: String },
  backlog: { type: String, enum: ["NO", "YES"], default: "NO" },
  gender: { type: String, enum: ["All", "Male", "Female", "Others"], default: "All" },
  otherMedical: { type: String },
  onboardingInfo: { type: String },

  // Salary & Personnel
  stipend: { type: String },
  stipendDetails: { type: String },

  primaryContactName: { type: String },
  primaryContactDesignation: { type: String },
  primaryContactEmail: { type: String },
  primaryContactMobile: { type: String },

  secondaryContactName: { type: String },
  secondaryContactDesignation: { type: String },
  secondaryContactEmail: { type: String },
  secondaryContactMobile: { type: String },

  disclosureObjection: { type: String, enum: ["Yes", "No"], default: "No" },

  // Placement Schedule
  placementSchedule: {
    type: Map,
    of: new mongoose.Schema({
      modality: { type: String, enum: ["Virtual", "Campus Visit", "NA"], default: "NA" },
      date: { type: String },
    }, { _id: false }),
  },
  consistentHiring: { type: Boolean, default: false },

  // Courses
  selectedBtech: [{ type: String }],
  selectedIntMtech: [{ type: String }],
  selectedDual: [{ type: String }],
  selectedMtech: [{ type: String }],
  selectedMba: [{ type: String }],
  selectedMscTech: [{ type: String }],

  // Other Details
  hireMscJAM: { type: String, enum: ["Yes", "No"], default: "No" },
  selectedMscJAM: [{ type: String }],
  
  hirePhD: { type: String, enum: ["Yes", "No"], default: "No" },
  phdDepartment: { type: String },

  hireSkillBased: { type: String, enum: ["Yes", "No"], default: "No" },
  skillBasedDetails: { type: String },

  // Declaration
  declarantName: { type: String, required: true },
  declarationDate: { type: Date, required: true },

}, {
  timestamps: true,
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
