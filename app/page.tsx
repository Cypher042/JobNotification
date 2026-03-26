import React from "react";
import { Search, Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function IITISMPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="bg-[#480c14] text-white w-full">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {/* You can replace this with the exact logo image from next/image, using a placeholder for now */}
            <div className="flex items-center">
              {/* Note: since /bak.png was used earlier, trying it here, else fallback text */}
              <img src="/bak.png" alt="IIT ISM Logo" className="h-16 md:h-20 object-contain bg-white rounded-full p-1" />
              <div className="ml-3 flex flex-col justify-center">
                <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                  IIT <span className="font-light text-sm md:text-base">INDIAN INSTITUTE<br/>OF TECHNOLOGY<br/>(INDIAN SCHOOL OF MINES) DHANBAD</span>
                </h1>
                <p className="italic font-serif text-sm mt-1 text-red-200">Legacy that Inspires the Future</p>
              </div>
            </div>
          </div>

          {/* Right Header Section */}
          <div className="flex flex-col items-end w-full md:w-auto">
            {/* Search Bar */}
            <div className="flex w-full md:w-[320px] mb-4">
              <input 
                type="text" 
                placeholder="Start typing here..." 
                className="w-full px-4 py-2 text-black border-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button className="bg-[#0f172a] text-white px-4 py-2 rounded-r-md flex items-center justify-center hover:bg-slate-800 transition-colors">
                <Search size={18} />
              </button>
            </div>

            {/* Navigation Navigation */}
            <nav className="flex flex-wrap justify-end gap-x-6 gap-y-2 text-sm font-bold tracking-wide">
              <Link href="#" className="hover:text-red-200 transition-colors">Home</Link>
              <Link href="#" className="hover:text-red-200 transition-colors">Placement Statistics</Link>
              <Link href="#" className="hover:text-red-200 transition-colors">For Recruiters</Link>
              <Link href="#" className="hover:text-red-200 transition-colors">For Students</Link>
              <Link href="#" className="hover:text-red-200 transition-colors">Our Team</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Social Sidebar */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col z-50 shadow-2xl">
        <a href="#" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:w-14 transition-all duration-300">
          <span className="font-bold text-xl">𝕏</span>
        </a>
        <a href="#" className="w-12 h-12 bg-[#0077b5] text-white flex items-center justify-center hover:w-14 transition-all duration-300">
          <Linkedin size={20} />
        </a>
        <a href="#" className="w-12 h-12 bg-[#c13584] text-white flex items-center justify-center hover:w-14 transition-all duration-300">
          <Instagram size={20} />
        </a>
        <a href="#" className="w-12 h-12 bg-[#3b5998] text-white flex items-center justify-center hover:w-14 transition-all duration-300">
          <Facebook size={20} />
        </a>
        <a href="#" className="w-12 h-12 bg-[#ff0000] text-white flex items-center justify-center hover:w-14 transition-all duration-300">
          <Youtube size={20} />
        </a>
      </div>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-6 pl-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          
          {/* Section 1 */}
          <div>
            <div className="flex items-center mb-8">
              <h2 className="text-[2.5rem] font-serif font-bold text-[#56141a] mr-4 leading-none">AIPC Guidelines</h2>
              <div className="h-[1px] bg-[#56141a]/40 w-24"></div>
            </div>
            <div className="relative bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 p-8 pt-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-orange-400 to-yellow-400"></div>
              <Link href="#" className="text-blue-500 hover:underline hover:text-blue-600 text-[15px] font-medium block">
                AIPC Guidelines
              </Link>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <div className="flex items-center mb-8">
              <h2 className="text-[2.5rem] font-serif font-bold text-[#56141a] mr-4 leading-none">Placement Process</h2>
              <div className="h-[1px] bg-[#56141a]/40 w-24"></div>
            </div>
            <div className="relative bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 p-8 pt-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-orange-400 to-yellow-400"></div>
              <Link href="#" className="text-blue-500 hover:underline hover:text-blue-600 text-[15px] font-medium block">
                Placement Process
              </Link>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <div className="mb-8">
              <h2 className="text-[2.5rem] font-serif font-bold text-[#56141a] leading-tight">Institute Placement</h2>
              <div className="flex items-center mt-1">
                <h2 className="text-[2.5rem] font-serif font-bold text-[#56141a] mr-4 leading-none">Brochure</h2>
                <div className="h-[1px] bg-[#56141a]/40 w-24"></div>
              </div>
            </div>
            <div className="relative bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 p-8 pt-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-orange-400 to-yellow-400"></div>
              <Link href="#" className="text-blue-500 hover:underline hover:text-blue-600 text-[15px] font-medium block">
                Institute Placement Brochure
              </Link>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <div className="mb-8">
              <h2 className="text-[2.5rem] font-serif font-bold text-[#56141a] leading-tight">Dept. Placement</h2>
              <div className="flex items-center mt-1">
                <h2 className="text-[2.5rem] font-serif font-bold text-[#56141a] mr-4 leading-none">Brochure</h2>
                <div className="h-[1px] bg-[#56141a]/40 w-24"></div>
              </div>
            </div>
            <div className="relative bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 p-8 pt-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-orange-400 to-yellow-400"></div>
              <Link href="#" className="text-blue-500 hover:underline hover:text-blue-600 text-[15px] font-medium block">
                Dept. Placement Brochure
              </Link>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <div className="flex items-center mb-8">
              <h2 className="text-[2.5rem] font-serif font-bold text-[#56141a] mr-4 leading-none">Internship Recruiters</h2>
              <div className="h-[1px] bg-[#56141a]/40 w-24"></div>
            </div>
            <div className="relative bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 p-8 pt-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-orange-400 to-yellow-400"></div>
              <div className="space-y-2">
                <Link href="/internship-login" className="text-blue-500 hover:underline hover:text-blue-600 text-[15px] font-medium block">
                  Login
                </Link>
                <Link href="/internship-register" className="text-blue-500 hover:underline hover:text-blue-600 text-[15px] font-medium block">
                  Register
                </Link>
              </div>
            </div>
          </div>
            {/* Section 6 */}
          <div>
            <div className="flex items-center mb-8">
              <h2 className="text-[2.5rem] font-serif font-bold text-[#56141a] mr-4 leading-none">Placement Recruiters</h2>
              <div className="h-[1px] bg-[#56141a]/40 w-24"></div>
            </div>
            <div className="relative bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 p-8 pt-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-orange-400 to-yellow-400"></div>
              <div className="space-y-2">
                <Link href="/placement-login" className="text-blue-500 hover:underline hover:text-blue-600 text-[15px] font-medium block">
                  Login
                </Link>
                <Link href="/placement-registration" className="text-blue-500 hover:underline hover:text-blue-600 text-[15px] font-medium block">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
