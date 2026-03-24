"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Building2, Briefcase, IndianRupee, Contact, CalendarHeart, GraduationCap, FileCheck } from "lucide-react";

const btechBranches = [
  "Chemical Engineering", "Civil Engineering", "Computer Science and Engineering", "Electrical Engineering",
  "Electronics & Communication Engineering", "Engineering Physics", "Environmental Engineering",
  "Mechanical Engineering", "Mining Machinery Engineering", "Mineral & Metallurgical Engineering",
  "Mining Engineering", "Petroleum Engineering"
];

const integratedMtechBranches = ["Mathematics & Computing", "Applied Geology", "Applied Geophysics"];
const dualDegreeBranches = ["B.Tech + B.Tech", "B.Tech + M.Tech"];

const mtechBranches = [
  "Applied Geophysics - Earthquake Science & Engineering",
  "Chemistry and Chemical Biology - Pharmaceutical Science & Engineering",
  "Chemical Engineering", "Civil Engineering", "Computer Science & Engineering",
  "Mathematics & Computing - Data Analytics",
  "Electrical Engineering - Power Electronics & Electrical Drives",
  "Electrical Engineering - Power System Engineering",
  "Electronics & Communication Engineering - Communication & Signal Processing",
  "Electronics & Communication Engineering - Optical Communication & Integrated Photonics",
  "Electronics & Communication Engineering - RF & Microwave Engineering",
  "Electronics & Communication Engineering - VLSI Design",
  "Environmental Science & Engineering - Environmental Engineering",
  "Fuel, Minerals and Metallurgical Engineering - Fuel and Energy Engineering",
  "Fuel, Minerals and Metallurgical Engineering - Metallurgical Engineering",
  "Mechanical Engineering - Machine Design",
  "Mechanical Engineering - Manufacturing Engineering",
  "Mechanical Engineering - Thermal Engineering",
  "Management Studies - Industrial Engineering & Management",
  "Mining Engineering - Mining Engineering",
  "Mining Engineering - Geomatics",
  "Mining Engineering - Tunneling and Underground Space Technology",
  "Petroleum Engineering"
];

const mbaBranches = ["Business Analytics", "Finance", "Human Resources", "Marketing", "Operations"];
const mscTechBranches = ["Applied Geology", "Applied Geophysics"];

const scheduleRounds = ["Pre-Placement Talk", "Resume Shortlisting", "Online/Written Test", "Group Discussion", "Any other Round", "Personal Interview"];

export default function JobForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 6;

  const [formData, setFormData] = useState<any>({
    companyName: "", website: "", postalAddress: "", employees: "", category: "Software/IT",
    designation: "", duration: "", placeOfPosting: "", jobDescription: "",
    cgpa: "", backlog: "NO", gender: "All", otherMedical: "", onboardingInfo: "",
    stipend: "", stipendDetails: "",
    primaryContactName: "", primaryContactDesignation: "", primaryContactEmail: "", primaryContactMobile: "",
    secondaryContactName: "", secondaryContactDesignation: "", secondaryContactEmail: "", secondaryContactMobile: "",
    disclosureObjection: "No",
    placementSchedule: scheduleRounds.reduce((acc: any, round) => {
        acc[round] = { modality: "NA", date: "" };
        return acc;
    }, {}),
    consistentHiring: false,
    selectedBtech: [], selectedIntMtech: [], selectedDual: [],
    selectedMtech: [], selectedMba: [], selectedMscTech: [],
    hireMscJAM: "No", selectedMscJAM: [],
    hirePhD: "No", phdDepartment: "",
    hireSkillBased: "No", skillBasedDetails: "",
    declarantName: "", declarationDate: ""
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev: any) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayToggle = (category: string, item: string) => {
    setFormData((prev: any) => {
      const current = prev[category] || [];
      if (current.includes(item)) return { ...prev, [category]: current.filter((x: string) => x !== item) };
      return { ...prev, [category]: [...current, item] };
    });
  };

  const handleScheduleChange = (round: string, field: string, value: string) => {
      setFormData((prev: any) => ({
          ...prev,
          placementSchedule: {
              ...prev.placementSchedule,
              [round]: { ...prev.placementSchedule[round], [field]: value }
          }
      }));
  }

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Application Submitted Successfully!");
        // Optional: Reset form or redirect user here
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: "Company", icon: <Building2 className="text-[#003366]" size={28} /> },
    { id: 2, title: "Job", icon: <Briefcase className="text-[#003366]" size={28} /> },
    { id: 3, title: "Salary & Contacts", icon: <IndianRupee className="text-[#003366]" size={28} /> },
    { id: 4, title: "Schedule", icon: <CalendarHeart className="text-[#003366]" size={28} /> },
    { id: 5, title: "Courses", icon: <GraduationCap className="text-[#003366]" size={28} /> },
    { id: 6, title: "Declaration", icon: <FileCheck className="text-[#003366]" size={28} /> }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 pb-20">
      <div className="w-full bg-white">
        
        {/* Formal Header */}
        <div className="bg-white border-b-[6px] border-[#FF9933] py-8 px-6 text-gray-900 relative flex flex-col sm:flex-row items-center justify-center text-center shadow-sm">
            <div className="sm:absolute sm:left-10 mb-4 sm:mb-0 flex items-center h-full">
               <img src="/bj.png" alt="IIT ISM Logo" className="w-28 sm:w-36 h-auto drop-shadow-md hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="sm:pl-16">
              <h1 className="text-xl sm:text-3xl font-black uppercase tracking-wider mb-2 text-[#003366] font-serif drop-shadow-sm">Indian Institute of Technology<br/>(Indian School of Mines), Dhanbad</h1>
              <h2 className="text-sm sm:text-base font-bold text-gray-700 uppercase tracking-widest mt-2 border-t border-gray-300 pt-2 inline-block">Job Notification Form</h2>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-8 pb-4 bg-gray-50 border-b border-gray-100 hidden sm:block">
          <div className="flex items-center justify-between relative max-w-4xl mx-auto">
            <div className="absolute left-0 top-5 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
            <div className="absolute left-0 top-5 transform -translate-y-1/2 h-1 bg-[#003366] transition-all duration-300 ease-in-out -z-10" style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}></div>
            
            {steps.map((st) => (
              <div key={st.id} className="flex flex-col items-center gap-2 cursor-pointer z-10 w-24" onClick={() => setStep(st.id)}>
                <div className={`w-10 h-10 rounded-sm flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm border-2 ${step >= st.id ? 'bg-[#003366] text-white border-[#003366]' : 'bg-white text-gray-400 border-gray-200'}`}>
                  {st.id}
                </div>
                <span className={`text-xs font-semibold ${step >= st.id ? 'text-[#003366]' : 'text-gray-400'}`}>{st.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Step 1: Company Overview */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-[#003366] pb-2">
                  <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Company Overview</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Company Name</label><input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" required /></div>
                  <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Website</label><input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                  <div className="space-y-2 md:col-span-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Postal Address</label><input type="text" name="postalAddress" value={formData.postalAddress} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                  <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">No. of Employees (approx) </label><input type="text" name="employees" value={formData.employees} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>

                  <div className="space-y-2 md:col-span-2 mt-2">
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-3">Category/Sector</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {["Software/IT", "Consulting", "Analytics", "FMCG", "Education/Ed Tech", "Core", "Technology", "PSU", "E-Commerce", "Banking & Finance", "Media", "Other"].map(cat => (
                        <label key={cat} className={`flex items-center space-x-2 p-3 rounded-sm cursor-pointer border transition-colors ${formData.category === cat ? 'bg-teal-50 border-teal-600' : 'bg-gray-50 border-transparent hover:bg-gray-100 hover:border-gray-200'}`}>
                          <input type="radio" name="category" value={cat} checked={formData.category === cat} onChange={handleChange} className="w-4 h-4 text-[#003366] focus:ring-[#003366]" />
                          <span className="text-sm text-gray-700 font-medium">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Job Details */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-[#003366] pb-2">
                  <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Job Details & Eligibility</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Designation</label><input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                  <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Duration (Mandatory)</label><input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                  <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Place of Posting</label><input type="text" name="placeOfPosting" value={formData.placeOfPosting} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                  
                  <div className="space-y-2 md:col-span-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Job Description</label><textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm"></textarea></div>

                  <div className="col-span-1 md:col-span-2 bg-[#F8FAFC] p-6 rounded-sm border border-gray-300">
                     <h4 className="font-bold text-[#003366] uppercase tracking-wide text-sm mb-4 border-b border-gray-300 pb-2">Eligibility Criteria</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Cut-off marks (CGPA)</label><input type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                        <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Backlog Allowed</label><select name="backlog" value={formData.backlog} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm"><option value="NO">NO</option><option value="YES">YES</option></select></div>
                        <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Gender</label><select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm"><option value="All">All</option><option value="Male">Male</option><option value="Female">Female</option><option value="Others">Others</option></select></div>
                        <div className="space-y-2 lg:col-span-1"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Other (Medical criteria)</label><input type="text" name="otherMedical" value={formData.otherMedical} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                        <div className="space-y-2 lg:col-span-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">On-boarding & Tentative Month</label><input type="text" name="onboardingInfo" value={formData.onboardingInfo} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Salary & Contacts */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-10">
                <div>
                   <div className="flex items-center gap-3 mb-6 border-b-2 border-[#003366] pb-2">
                  <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Salary & Personnel</h3>
                </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F8FAFC] p-6 rounded-sm border border-gray-300 mb-8">
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Stipend (in Rs.)</label><input type="text" name="stipend" value={formData.stipend} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Stipend Details (Perks)</label><textarea name="stipendDetails" value={formData.stipendDetails} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm"></textarea></div>
                   </div>

                   <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Primary Contact</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Name</label><input type="text" name="primaryContactName" value={formData.primaryContactName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Designation</label><input type="text" name="primaryContactDesignation" value={formData.primaryContactDesignation} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Email Address</label><input type="email" name="primaryContactEmail" value={formData.primaryContactEmail} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Mobile No.</label><input type="tel" name="primaryContactMobile" value={formData.primaryContactMobile} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                   </div>

                   <h4 className="font-bold text-gray-800 mb-4 border-b pb-2">Secondary Contact (If any)</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Name</label><input type="text" name="secondaryContactName" value={formData.secondaryContactName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Designation</label><input type="text" name="secondaryContactDesignation" value={formData.secondaryContactDesignation} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Email Address</label><input type="email" name="secondaryContactEmail" value={formData.secondaryContactEmail} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                      <div className="space-y-2"><label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Mobile No.</label><input type="tel" name="secondaryContactMobile" value={formData.secondaryContactMobile} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 focus:border-[#003366] focus:outline-none focus:ring-1 focus:ring-[#003366] bg-white text-sm shadow-sm rounded-sm" /></div>
                   </div>

                   <div className="bg-[#FFF5F5] p-5 rounded-sm border border-red-200">
                     <h4 className="font-bold text-red-900 mb-2">Disclosure of company contacts</h4>
                     <p className="text-sm text-red-800 mb-4">Do you object to sharing your contact details with Ministry of Education for NIRF ranking?</p>
                     <div className="flex gap-6">
                       <label className="flex items-center space-x-2 cursor-pointer font-medium text-gray-700"><input type="radio" name="disclosureObjection" value="Yes" checked={formData.disclosureObjection === "Yes"} onChange={handleChange} className="w-4 h-4 text-red-600 focus:ring-red-600" /><span>Yes</span></label>
                       <label className="flex items-center space-x-2 cursor-pointer font-medium text-gray-700"><input type="radio" name="disclosureObjection" value="No" checked={formData.disclosureObjection === "No"} onChange={handleChange} className="w-4 h-4 text-red-600 focus:ring-red-600" /><span>No (Not allowed to share anywhere)</span></label>
                     </div>
                   </div>
                </div>
              </div>
            )}

            {/* Step 4: Schedule */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-[#003366] pb-2">
                  <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Placement Schedule</h3>
                </div>
                <p className="mb-6 text-sm text-gray-600 font-medium">Shortlisting, Test, etc. Starts from 01-July-2025 and continues till 31-Mar-2026.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                   {scheduleRounds.map(round => (
                     <div key={round} className="bg-gray-50 border border-gray-200 rounded-sm overflow-hidden">
                       <div className="bg-[#003366] text-white px-4 py-2 font-semibold text-center text-sm">{round}</div>
                       <div className="p-4 space-y-4">
                          <div className="flex justify-between items-center bg-white p-1 rounded-sm border border-gray-300">
                             {["Virtual", "Campus Visit", "NA"].map(mod => (
                               <label key={mod} className="flex-1 text-center cursor-pointer">
                                 <input type="radio" name={`${round}-mod`} value={mod} checked={formData.placementSchedule[round].modality === mod} onChange={(e) => handleScheduleChange(round, 'modality', e.target.value)} className="peer hidden" />
                                 <div className="peer-checked:bg-[#003366] peer-checked:text-white text-xs font-semibold py-1.5 px-2 rounded transition-all text-gray-600">{mod}</div>
                               </label>
                             ))}
                          </div>
                          {formData.placementSchedule[round].modality !== "NA" && (
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Proposed Date</label>
                              <input type="date" value={formData.placementSchedule[round].date} onChange={(e) => handleScheduleChange(round, 'date', e.target.value)} className="w-full text-sm px-3 py-2 border rounded border-gray-300 outline-none" />
                            </div>
                          )}
                       </div>
                     </div>
                   ))}
                </div>

                <div className="flex items-start gap-3 p-4 bg-[#F0F4F8] border border-[#003366] rounded-sm">
                    <input type="checkbox" id="consistent" name="consistentHiring" checked={formData.consistentHiring} onChange={handleChange} className="mt-1 w-5 h-5 text-[#003366] rounded" />
                    <label htmlFor="consistent" className="text-sm font-medium text-gray-800">We confirm that the mode of hiring is consistent across all IITs.</label>
                </div>
              </div>
            )}

            {/* Step 5: Courses */}
            {step === 5 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-[#003366] pb-2">
                  <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Eligible Courses & Disciplines</h3>
                </div>

                <div className="bg-[#FFFBEB] p-4 rounded-sm border border-[#FF9933] text-sm text-gray-800 font-bold tracking-wide mb-6">
                    Allowable Job Duration: 2 Months (Summer) / 6 Months (Depending on program). Select applicable disciplines below:
                </div>

                {/* B.Tech */}
                <div>
                   <div className="flex justify-between items-center bg-slate-100 p-3 rounded-sm border-b border-slate-300">
                      <h4 className="font-bold text-slate-800">4-Year B.Tech Programs (JEE Adv)</h4>
                      <button type="button" onClick={() => setFormData((p:any) => ({...p, selectedBtech: p.selectedBtech?.length === btechBranches.length ? [] : [...btechBranches]}))} className="text-[10px] font-bold uppercase tracking-widest text-[#003366] hover:underline bg-white px-2 py-1 border border-[#003366] rounded-sm">Select All</button>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 border border-t-0 border-slate-200 rounded-sm">
                      {btechBranches.map(b => (
                        <label key={b} className="flex items-start gap-2 cursor-pointer text-sm font-medium text-gray-700">
                          <input type="checkbox" checked={formData.selectedBtech?.includes(b) || false} onChange={() => handleArrayToggle('selectedBtech', b)} className="mt-0.5 w-4 h-4 text-[#003366] rounded" /> {b}
                        </label>
                      ))}
                   </div>
                </div>

                {/* M.Tech */}
                <div>
                   <div className="flex justify-between items-center bg-slate-100 p-3 rounded-sm border-b border-slate-300">
                      <h4 className="font-bold text-slate-800">2-Year M.Tech Programs (GATE)</h4>
                      <button type="button" onClick={() => setFormData((p:any) => ({...p, selectedMtech: p.selectedMtech?.length === mtechBranches.length ? [] : [...mtechBranches]}))} className="text-[10px] font-bold uppercase tracking-widest text-[#003366] hover:underline bg-white px-2 py-1 border border-[#003366] rounded-sm">Select All</button>
                   </div>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 border border-t-0 border-slate-200 rounded-sm h-64 overflow-y-auto">
                      {mtechBranches.map(b => (
                        <label key={b} className="flex items-start gap-2 cursor-pointer text-sm font-medium text-gray-700 leading-tight">
                          <input type="checkbox" checked={formData.selectedMtech?.includes(b) || false} onChange={() => handleArrayToggle('selectedMtech', b)} className="mt-0.5 w-4 h-4 text-[#003366] rounded flex-shrink-0" /> <span>{b}</span>
                        </label>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* MBA */}
                    <div>
                       <div className="flex justify-between items-center bg-slate-100 p-3 rounded-sm border-b border-slate-300">
                          <h4 className="font-bold text-slate-800">2-Year MBA (CAT)</h4>
                       </div>
                       <div className="grid gap-3 p-4 border border-t-0 border-slate-200 rounded-sm">
                          {mbaBranches.map(b => (
                            <label key={b} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                              <input type="checkbox" checked={formData.selectedMba?.includes(b) || false} onChange={() => handleArrayToggle('selectedMba', b)} className="w-4 h-4 text-[#003366] rounded" /> {b}
                            </label>
                          ))}
                       </div>
                    </div>
                    {/* MSc. Tech */}
                    <div>
                       <div className="flex justify-between items-center bg-slate-100 p-3 rounded-sm border-b border-slate-300">
                          <h4 className="font-bold text-slate-800">3-Year MSc. Tech (JAM)</h4>
                       </div>
                       <div className="grid gap-3 p-4 border border-t-0 border-slate-200 rounded-sm">
                          {mscTechBranches.map(b => (
                            <label key={b} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                              <input type="checkbox" checked={formData.selectedMscTech?.includes(b) || false} onChange={() => handleArrayToggle('selectedMscTech', b)} className="w-4 h-4 text-[#003366] rounded" /> {b}
                            </label>
                          ))}
                       </div>
                    </div>
                </div>

              </div>
            )}

            {/* Step 6: Confirmation & Declaration */}
            {step === 6 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                <div className="flex items-center gap-3 mb-6 border-b-2 border-[#003366] pb-2">
                  <h3 className="text-lg font-bold text-[#003366] uppercase tracking-wide">Other Details & Declaration</h3>
                </div>

                <div className="space-y-6 bg-[#F8FAFC] p-6 rounded-sm border border-gray-300">
                   <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">Interested in 2-Year M.Sc. Students (JAM)?</h4>
                      <div className="flex gap-4 mb-3">
                         <label className="flex items-center space-x-2"><input type="radio" name="hireMscJAM" value="Yes" checked={formData.hireMscJAM === "Yes"} onChange={handleChange} className="text-[#003366]" /> <span>Yes</span></label>
                         <label className="flex items-center space-x-2"><input type="radio" name="hireMscJAM" value="No" checked={formData.hireMscJAM === "No"} onChange={handleChange} className="text-[#003366]" /> <span>No</span></label>
                      </div>
                      {formData.hireMscJAM === "Yes" && (
                         <div className="flex gap-4 text-sm">
                           {["Physics", "Chemistry", "Mathematics & Computing"].map(d => (
                             <label key={d} className="flex items-center space-x-2"><input type="checkbox" checked={formData.selectedMscJAM?.includes(d) || false} onChange={() => handleArrayToggle('selectedMscJAM', d)} className="text-[#003366] rounded" /> <span>{d}</span></label>
                           ))}
                         </div>
                      )}
                   </div>

                   <hr className="border-slate-300" />

                   <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">Interested in Ph.D. Students (GATE/NET)?</h4>
                      <div className="flex gap-4 mb-3">
                         <label className="flex items-center space-x-2"><input type="radio" name="hirePhD" value="Yes" checked={formData.hirePhD === "Yes"} onChange={handleChange} className="text-[#003366]" /> <span>Yes</span></label>
                         <label className="flex items-center space-x-2"><input type="radio" name="hirePhD" value="No" checked={formData.hirePhD === "No"} onChange={handleChange} className="text-[#003366]" /> <span>No</span></label>
                      </div>
                      {formData.hirePhD === "Yes" && (
                         <input type="text" name="phdDepartment" value={formData.phdDepartment} onChange={handleChange} placeholder="Specify required Department name" className="w-full px-4 py-2 border rounded-sm outline-none focus:ring-2 focus:ring-[#003366]" />
                      )}
                   </div>

                   <hr className="border-slate-300" />

                   <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">Skill-based hiring irrespective of branch?</h4>
                      <div className="flex gap-4 mb-3">
                         <label className="flex items-center space-x-2"><input type="radio" name="hireSkillBased" value="Yes" checked={formData.hireSkillBased === "Yes"} onChange={handleChange} className="text-[#003366]" /> <span>Yes</span></label>
                         <label className="flex items-center space-x-2"><input type="radio" name="hireSkillBased" value="No" checked={formData.hireSkillBased === "No"} onChange={handleChange} className="text-[#003366]" /> <span>No</span></label>
                      </div>
                      {formData.hireSkillBased === "Yes" && (
                         <input type="text" name="skillBasedDetails" value={formData.skillBasedDetails} onChange={handleChange} placeholder="Specify required skills" className="w-full px-4 py-2 border rounded-sm outline-none focus:ring-2 focus:ring-[#003366]" />
                      )}
                   </div>
                </div>

                <div className="space-y-6 mt-10">
                    <h4 className="font-bold text-xl text-gray-800 border-b pb-2">Self-Declaration (Mandatory)</h4>
                    <div className="bg-white p-5 rounded-sm text-sm text-gray-700 space-y-4 shadow-sm border border-gray-200">
                       <p>I/We confirm that the information pertaining to the posted job profile is accurate and verified to the best of our knowledge. The company commits to adhere to the terms and conditions outlined in these job profiles while extending offers. No additional clauses or changes will be introduced in the final offers extended to the candidates. All relevant details have been clearly outlined in the Job Notification Form.</p>
                       <p>I/We have read the placement Guidelines of <strong>IIT (ISM) Dhanbad</strong> mentioned above and the AIPC Guidelines.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end mt-6">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold">Name & Designation</label>
                      <input type="text" name="declarantName" value={formData.declarantName} onChange={handleChange} className="w-full border-b border-gray-400 py-2 outline-none focus:border-[#003366] bg-transparent" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold">Date & Signature (Digital)</label>
                      <input type="date" name="declarationDate" value={formData.declarationDate} onChange={handleChange} className="w-full border-b border-gray-400 py-2 outline-none focus:border-[#003366] bg-transparent" required />
                    </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 mt-10 border-t border-gray-200">
              <button suppressHydrationWarning type="button" onClick={prevStep} disabled={step === 1 ? true : undefined} className={`flex items-center gap-2 px-6 py-3 rounded-sm font-bold transition-all ${step === 1 ? 'opacity-0 cursor-default' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <ChevronLeft size={18} /> Previous
              </button>

              <button 
                type="button" 
                onClick={step === totalSteps ? handleSubmit : nextStep} 
                disabled={isSubmitting ? true : undefined}
                className="flex items-center gap-2 px-8 py-3 rounded-sm font-bold bg-[#003366] text-white hover:bg-teal-800 shadow-md transition-transform active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed">
                {isSubmitting ? 'Submitting...' : step === totalSteps ? 'Submit Binding Declaration' : 'Save & Next'}
                {step !== totalSteps && <ChevronRight size={18} />}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}