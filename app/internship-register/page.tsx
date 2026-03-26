"use client";

import { useState } from "react";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GraduationCap, Building2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  contactNumber: z.string().min(10, { message: "Must be at least 10 characters" }),
  designation: z.string().min(2, { message: "Must be at least 2 characters" }),
  landline: z.string().optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),

  companyName: z.string().min(2, { message: "Must be at least 2 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  yearOfEstablishment: z.string().min(4, { message: "Please enter a valid year" }).optional().or(z.literal('')),
  website: z.string().url({ message: "Please enter a valid URL (e.g., https://example.com)" }).optional().or(z.literal('')),
  companySize: z.string().optional(),
  annualTurnover: z.string().optional(),
  socialMediaLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  domains: z.string().min(1, { message: "Please select domains" }),
  addressLine1: z.string().min(2, { message: "Must be at least 2 characters" }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "Must be at least 2 characters" }),
  state: z.string().min(2, { message: "Must be at least 2 characters" }),
  country: z.string().min(1, { message: "Please select a country" }),
  
  isRobotCheck: z.boolean().refine((val) => val === true, {
    message: "Please complete the security verification",
  }),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema as any),
    defaultValues: {
      fullName: "",
      email: "",
      contactNumber: "",
      designation: "",
      landline: "",
      password: "",
      companyName: "",
      category: "",
      yearOfEstablishment: "",
      website: "",
      companySize: "",
      annualTurnover: "",
      socialMediaLink: "",
      domains: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      isRobotCheck: false,
    },
  });

  async function onSubmit(values: RegisterValues) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/internship/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Registration successful! Redirecting...");
      router.push("/internship-notification-form");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (fieldName: keyof RegisterValues) => {
    return `h-11 bg-white focus-visible:ring-1 focus-visible:-ring-offset-1 ${errors[fieldName] ? "border-[#ff4d4f] focus-visible:ring-[#ff4d4f] text-[#ff4d4f] placeholder:text-red-300" : "border-slate-200 focus-visible:ring-slate-400"}`;
  };

  const ErrorMessage = ({ fieldName }: { fieldName: keyof RegisterValues }) => {
    if (!errors[fieldName]) return null;
    return (
      <div className="flex items-center text-[#ff4d4f] text-[13px] mt-1.5 font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {errors[fieldName]?.message}
      </div>
    );
  };

  const onInvalid: SubmitErrorHandler<RegisterValues> = (errors) => {
    // Collect all error messages from the object
    const errorMessages = Object.values(errors)
      .map(err => err?.message)
      .filter(Boolean) as string[];
      
    if (errorMessages.length > 0) {
      toast.error(`Please fix ${errorMessages.length} validation error(s) before submitting.`);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side branding */}
      <div className="hidden lg:flex w-[35%] bg-[#4A0D16] flex-col items-center justify-center p-12 text-white fixed h-full z-10 shadow-2xl">
        <div className="text-center space-y-8 w-full max-w-md">
          <div className="flex justify-center items-center">
            <img src="/bak.png" alt="IIT Dhanbad Logo" className="h-28 w-auto object-contain" />
          </div>
          <h1 className="text-[2.75rem] font-serif font-bold leading-[1.15] tracking-tight">
            Career
            <br />
            Development
            <br />
            Centre
          </h1>
          <div className="flex items-center justify-center space-x-3 text-slate-200 mt-8 pt-6 border-t border-white/10">
            <GraduationCap className="h-6 w-6" strokeWidth={1.5} />
            <span className="text-sm font-medium tracking-wide">
              Indian Institute of Technology (ISM), Dhanbad
            </span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
           <div className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-black blur-3xl"></div>
        </div>
      </div>

      {/* Main Right Side Content */}
      <div className="flex-1 lg:ml-[35%] flex flex-col justify-start pb-20 pt-16 px-6 sm:px-12 md:px-16 lg:px-20 lg:pr-24 overflow-y-auto">
        <div className="max-w-[800px] w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-[2.2rem] font-bold text-[#0f172a] tracking-tight">
              Recruiter Registration
            </h2>
            <p className="mt-3 text-[1.1rem] text-slate-500 font-medium">
              Join our network of top recruiters
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-12">
            {/* 1. Personal Information */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-4">
                <div className="bg-[#1e293b] text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold shadow-sm text-sm">1</div>
                <h3 className="text-[1.2rem] font-bold text-slate-900">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7 pl-1 md:pl-0">
                <div className="space-y-[6px]">
                  <Label htmlFor="fullName" className="text-[13px] font-semibold text-slate-700">Full Name *</Label>
                  <Input id="fullName" className={inputClass("fullName")} {...register("fullName")} />
                  <ErrorMessage fieldName="fullName" />
                </div>
                <div className="space-y-[6px]">
                  <Label htmlFor="email" className="text-[13px] font-semibold text-slate-700">Email Address *</Label>
                  <Input id="email" type="email" className={inputClass("email")} {...register("email")} />
                  <ErrorMessage fieldName="email" />
                </div>
                <div className="space-y-[6px]">
                  <Label htmlFor="contactNumber" className="text-[13px] font-semibold text-slate-700">Contact Number *</Label>
                  <Input id="contactNumber" className={inputClass("contactNumber")} {...register("contactNumber")} />
                  <ErrorMessage fieldName="contactNumber" />
                </div>
                <div className="space-y-[6px]">
                  <Label htmlFor="designation" className="text-[13px] font-semibold text-slate-700">Designation *</Label>
                  <Input id="designation" className={inputClass("designation")} {...register("designation")} />
                  <ErrorMessage fieldName="designation" />
                </div>
                <div className="space-y-[6px] md:col-span-2">
                  <Label htmlFor="landline" className="text-[13px] font-semibold text-slate-700">Landline (optional)</Label>
                  <Input id="landline" className={inputClass("landline")} {...register("landline")} />
                  <ErrorMessage fieldName="landline" />
                </div>
                <div className="space-y-[6px] md:col-span-2">
                  <Label htmlFor="password" className="text-[13px] font-semibold text-slate-700">Password *</Label>
                  <Input id="password" type="password" className={inputClass("password")} {...register("password")} />
                  <ErrorMessage fieldName="password" />
                </div>
              </div>
            </div>

            {/* 2. Company Information */}
            <div className="space-y-8 pt-4">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-4">
                <div className="bg-[#1e293b] text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold shadow-sm text-sm">2</div>
                <h3 className="text-[1.2rem] font-bold text-slate-900">Company Information</h3>
              </div>
              
              <div className="bg-[#0f172a] text-white rounded-lg py-4 text-[13px] uppercase tracking-wider text-center font-bold shadow-md cursor-pointer">
                Create New Company
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7 pl-1 md:pl-0">
                <div className="space-y-[6px]">
                  <Label htmlFor="companyName" className="text-[13px] font-semibold text-slate-700">Company Name *</Label>
                  <Input id="companyName" className={inputClass("companyName")} {...register("companyName")}/>
                  <ErrorMessage fieldName="companyName" />
                </div>
                <div className="space-y-[6px]">
                  <Label htmlFor="category" className="text-[13px] font-semibold text-slate-700">Category *</Label>
                  <Select onValueChange={(val: string | null) => val && setValue("category", val, { shouldValidate: true })}>
                    <SelectTrigger className={`h-11 w-full bg-white ${errors.category ? "border-[#ff4d4f] ring-1 ring-[#ff4d4f] text-[#ff4d4f]" : "border-slate-200"}`}>
                      <SelectValue placeholder="Select company category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="it">IT / Software</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage fieldName="category" />
                </div>
                
                <div className="space-y-[6px]">
                  <Label htmlFor="yearOfEstablishment" className="text-[13px] font-semibold text-slate-700">Year of Establishment</Label>
                  <Input id="yearOfEstablishment" type="number" className={inputClass("yearOfEstablishment")} {...register("yearOfEstablishment")} />
                  <ErrorMessage fieldName="yearOfEstablishment" />
                </div>
                <div className="space-y-[6px]">
                  <Label htmlFor="website" className="text-[13px] font-semibold text-slate-700">Website</Label>
                  <Input id="website" type="url" className={inputClass("website")} {...register("website")} />
                  <ErrorMessage fieldName="website" />
                </div>

                <div className="space-y-[6px]">
                  <Label htmlFor="companySize" className="text-[13px] font-semibold text-slate-700">Company Size</Label>
                  <Input id="companySize" className={inputClass("companySize")} {...register("companySize")} />
                  <ErrorMessage fieldName="companySize" />
                </div>
                <div className="space-y-[6px]">
                  <Label htmlFor="annualTurnover" className="text-[13px] font-semibold text-slate-700">Annual Turnover</Label>
                  <Input id="annualTurnover" className={inputClass("annualTurnover")} {...register("annualTurnover")} />
                  <ErrorMessage fieldName="annualTurnover" />
                </div>

                <div className="space-y-[6px]">
                  <Label htmlFor="socialMediaLink" className="text-[13px] font-semibold text-slate-700">Social Media Link</Label>
                  <Input id="socialMediaLink" type="url" className={inputClass("socialMediaLink")} {...register("socialMediaLink")} />
                  <ErrorMessage fieldName="socialMediaLink" />
                </div>
                <div className="space-y-[6px]">
                  <Label htmlFor="domains" className="text-[13px] font-semibold text-slate-700">Domains *</Label>
                  <Select onValueChange={(val: string | null) => val && setValue("domains", val, { shouldValidate: true })}>
                    <SelectTrigger className={`h-11 w-full bg-white ${errors.domains ? "border-[#ff4d4f] ring-1 ring-[#ff4d4f] text-[#ff4d4f]" : "border-slate-200"}`}>
                      <SelectValue placeholder="Select multiple options..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="software_dev">Software Development</SelectItem>
                      <SelectItem value="data_science">Data Science</SelectItem>
                      <SelectItem value="ai">AI / ML</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage fieldName="domains" />
                </div>

                <div className="space-y-[6px] md:col-span-2">
                  <Label htmlFor="addressLine1" className="text-[13px] font-semibold text-slate-700">Address Line 1 *</Label>
                  <Input id="addressLine1" className={inputClass("addressLine1")} {...register("addressLine1")} />
                  <ErrorMessage fieldName="addressLine1" />
                </div>
                <div className="space-y-[6px] md:col-span-2">
                  <Label htmlFor="addressLine2" className="text-[13px] font-semibold text-slate-700">Address Line 2 (Optional)</Label>
                  <Input id="addressLine2" className={inputClass("addressLine2")} {...register("addressLine2")} />
                  <ErrorMessage fieldName="addressLine2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-7 pl-1 md:pl-0 pt-2">
                <div className="space-y-[6px]">
                  <Label htmlFor="city" className="text-[13px] font-semibold text-slate-700">City *</Label>
                  <Input id="city" className={inputClass("city")} {...register("city")} />
                  <ErrorMessage fieldName="city" />
                </div>
                <div className="space-y-[6px]">
                  <Label htmlFor="state" className="text-[13px] font-semibold text-slate-700">State *</Label>
                  <Input id="state" className={inputClass("state")} {...register("state")} />
                  <ErrorMessage fieldName="state" />
                </div>
                <div className="space-y-[6px]">
                  <Label htmlFor="country" className="text-[13px] font-semibold text-slate-700">Country *</Label>
                  <Select onValueChange={(val: string | null) => val && setValue("country", val, { shouldValidate: true })}>
                    <SelectTrigger className={`h-11 w-full bg-white ${errors.country ? "border-[#ff4d4f] ring-1 ring-[#ff4d4f] text-[#ff4d4f]" : "border-slate-200"}`}>
                      <SelectValue placeholder="Select country..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="uae">United Arab Emirates</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage fieldName="country" />
                </div>
              </div>
            </div>

            {/* 3. Security Verification */}
            <div className="space-y-8 pt-4">
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-4">
                <div className="bg-[#1e293b] text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold shadow-sm text-sm">3</div>
                <h3 className="text-[1.2rem] font-bold text-slate-900">Security Verification</h3>
              </div>
              
              <div>
                <div className={`bg-slate-50 border p-5 rounded-lg max-w-sm flex items-center shadow-sm ${errors.isRobotCheck ? 'border-[#ff4d4f]' : 'border-slate-200'}`}>
                  <Checkbox 
                     id="robotCheck" 
                     className={`h-6 w-6 border-slate-300 rounded data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 ${errors.isRobotCheck ? 'border-[#ff4d4f]' : ''}`}
                     onCheckedChange={(checked) => setValue("isRobotCheck", checked as boolean, { shouldValidate: true })}
                  />
                  <Label htmlFor="robotCheck" className={`cursor-pointer font-medium ml-4 select-none ${errors.isRobotCheck ? 'text-[#ff4d4f]' : 'text-slate-800'}`}>
                    I'm not a robot
                  </Label>
                </div>
                <ErrorMessage fieldName="isRobotCheck" />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm mt-6 font-medium bg-red-50 border border-red-100 p-4 rounded-lg flex items-center">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></div>
                {error}
              </div>
            )}

            <div className="pt-6">
              <div className="flex flex-col sm:flex-row gap-5">
                <Button type="submit" className="h-12 flex-1 sm:flex-none sm:w-[260px] bg-[#8994a3] hover:bg-[#727d8c] text-white font-semibold text-base shadow-sm rounded-lg" disabled={loading}>
                  {loading ? "Processing..." : (
                    <span className="flex items-center">
                      <Check className="w-5 h-5 mr-2" strokeWidth={3} /> Complete Registration
                    </span>
                  )}
                </Button>
                <Link href="/internship-login" className="flex-1 sm:w-auto">
                  <Button type="button" variant="outline" className="w-full h-12 font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 transition-colors">
                    Already have an account? Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}