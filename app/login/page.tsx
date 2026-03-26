"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GraduationCap, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      router.push("/admin"); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = (fieldName: keyof LoginValues) => {
    return `h-11 bg-white focus-visible:ring-1 focus-visible:-ring-offset-1 ${errors[fieldName] ? "border-[#ff4d4f] focus-visible:ring-[#ff4d4f] text-[#ff4d4f] placeholder:text-red-300" : "border-slate-200 focus-visible:ring-slate-400"}`;
  };

  const ErrorMessage = ({ fieldName }: { fieldName: keyof LoginValues }) => {
    if (!errors[fieldName]) return null;
    return (
      <div className="flex items-center text-[#ff4d4f] text-[13px] mt-1.5 font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {errors[fieldName]?.message}
      </div>
    );
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
            Advancement &
            <br />
            Mentoring Centre
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
      <div className="flex-1 lg:ml-[35%] flex flex-col justify-center pb-20 pt-16 px-6 sm:px-12 md:px-16 lg:px-20 lg:pr-24 overflow-y-auto">                            
        <div className="max-w-[450px] w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-[2.2rem] font-bold text-[#0f172a] tracking-tight">
              Recruiter Login
            </h2>
            <p className="mt-3 text-[1.1rem] text-slate-500 font-medium">
              Sign in securely to access your portal
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5 shadow-sm border border-slate-100 rounded-xl p-8 bg-slate-50/50">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[13px] font-semibold text-slate-700">Email Address *</Label>
                <Input id="email" type="email" placeholder="recruiter@company.com" className={inputClass("email")} {...register("email")} />
                <ErrorMessage fieldName="email" />
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                   <Label htmlFor="password" className="text-[13px] font-semibold text-slate-700">Password *</Label>
                   <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Forgot password?</span>
                </div>
                <Input id="password" type="password" placeholder="••••••••" className={inputClass("password")} {...register("password")} />
                <ErrorMessage fieldName="password" />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm mt-6 font-medium bg-red-50 border border-red-100 p-4 rounded-lg flex items-center">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></div>
                {error}
              </div>
            )}

            <Button type="submit" className="h-12 w-full bg-[#8994a3] hover:bg-[#727d8c] text-white font-medium text-base shadow-md rounded-lg mt-2" disabled={loading}>
              {loading ? "Processing..." : "Sign In to Dashboard"}
            </Button>
            
            <div className="text-center w-full mt-6">
              <span className="text-slate-500 text-sm">Don't have an account? </span>
              <Link href="/register" className="text-blue-600 text-sm font-semibold hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}