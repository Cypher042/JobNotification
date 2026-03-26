import mongoose from 'mongoose';

const RecruiterSchema = new mongoose.Schema({
  // Personal Info
  fullName: { type: String, required: [true, 'Please provide a full name'] },
  email: { type: String, required: [true, 'Please provide an email'], unique: true },
  password: { type: String, required: [true, 'Please provide a password'] },
  contactNumber: { type: String, required: false }, // Let's make it required below
  designation: { type: String, required: false },
  landline: { type: String, default: '' },
  
  // Company Info
  companyName: { type: String, required: [true, 'Please provide a company name'] },
  category: { type: String, required: false },
  yearOfEstablishment: { type: String, default: '' },
  website: { type: String, default: '' },
  companySize: { type: String, default: '' },
  annualTurnover: { type: String, default: '' },
  socialMediaLink: { type: String, default: '' },
  domains: { type: [String], default: [] },
  addressLine1: { type: String, required: false },
  addressLine2: { type: String, default: '' },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
}, { timestamps: true });

export default mongoose.models.Recruiter || mongoose.model('Recruiter', RecruiterSchema);
