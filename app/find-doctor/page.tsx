"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Search, MapPin, Stethoscope, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function FindDoctor() {
  const [condition, setCondition] = useState("")
  const [location, setLocation] = useState("")
  const [apiResponse, setApiResponse] = useState<{ doctors?: string; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleFindDoctors = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ condition, location }),
      })

      const data = await res.json()
      setApiResponse(data)
    } catch (error) {
      console.error("Error fetching doctors:", error)
      setApiResponse({ error: "ডাক্তারদের তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।" })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="pt-20 sm:pt-24" />

      {/* Hero Search Section */}
      <div className="relative px-4 sm:px-6 py-8 sm:py-12">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
              নিকটস্থ ডাক্তার খুঁজুন
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              আপনার সমস্যা ও অবস্থান জানিয়ে সেরা ডাক্তারদের খুঁজে নিন
            </p>
          </div>

          {/* Search Form Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700/50 shadow-xl">
            <div className="flex flex-col gap-4">
              {/* Input Fields Row */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Condition Input */}
                <div className="flex-1 relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl bg-gray-900/80 text-white placeholder-gray-500 border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-sm sm:text-base"
                    placeholder="আপনার শারীরিক সমস্যা লিখুন..."
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  />
                </div>

                {/* Location Input */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 w-5 h-5" />
                  <input
                    className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl bg-gray-900/80 text-white placeholder-gray-500 border border-gray-600 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-sm sm:text-base"
                    placeholder="আপনার অবস্থান লিখুন..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Search Button */}
              <Button
                className="w-full sm:w-auto sm:min-w-[200px] sm:mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-sm sm:text-base py-3 sm:py-3.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40"
                onClick={handleFindDoctors}
                disabled={loading}
              >
                <Search size={18} />
                {loading ? "অনুসন্ধান করা হচ্ছে..." : "ডাক্তার খুঁজুন"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-grow px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {apiResponse && apiResponse.doctors ? (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white pb-3 border-b border-gray-700/50">
                ডাক্তার পাওয়া গেছে
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {apiResponse.doctors
                  .split("\n\n--------------------------------------------------\n")
                  .map((doctor: string, index: number) => {
                    const doctorInfo: Record<string, string> = {}
                    doctor.split("\n").forEach((line: string) => {
                      if (line.includes(": ")) {
                        const [key, ...valueParts] = line.split(": ")
                        doctorInfo[key] = valueParts.join(": ")
                      }
                    })

                    return (
                      <div
                        key={index}
                        className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all p-5 sm:p-6 flex flex-col border border-gray-700/50 hover:border-purple-500/30"
                      >
                        <h3 className="text-lg sm:text-xl font-semibold text-purple-400 mb-2">
                          {doctorInfo["Name"]}
                        </h3>

                        <div className="mb-3 sm:mb-4">
                          <span className="inline-block bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {doctorInfo["Specialization"]}
                          </span>
                        </div>

                        <div className="space-y-2 sm:space-y-3 text-gray-300 flex-grow text-sm sm:text-base">
                          <p className="flex items-start">
                            <span className="font-medium min-w-20 sm:min-w-24 inline-block text-gray-400">অভিজ্ঞতা:</span>
                            <span>{doctorInfo["Experience"]}</span>
                          </p>

                          <p className="flex items-start">
                            <span className="font-medium min-w-20 sm:min-w-24 inline-block text-gray-400">ফি:</span>
                            <span>{doctorInfo["Consultation Fee"]}</span>
                          </p>

                          <p className="flex items-start">
                            <span className="font-medium min-w-20 sm:min-w-24 inline-block text-gray-400">অবস্থান:</span>
                            <span className="text-xs sm:text-sm">{doctorInfo["Location"]}</span>
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                          <Link
                            href={doctorInfo["About Doctor"] || "#"}
                            target="_blank"
                            className="text-purple-400 hover:text-purple-300 font-medium text-sm inline-flex items-center gap-1 transition-colors"
                          >
                            প্রোফাইল দেখুন
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          ) : apiResponse && apiResponse.error ? (
            <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 text-center">
              <p className="text-red-400">{apiResponse.error}</p>
            </div>
          ) : (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 sm:p-12 text-center border border-gray-700/30">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-900/30 flex items-center justify-center mb-4 sm:mb-6">
                  <Search size={32} className="text-purple-400 sm:w-10 sm:h-10" />
                </div>
                <p className="text-gray-400 text-base sm:text-lg max-w-md">
                  আপনার শারীরিক সমস্যা এবং অবস্থান লিখে নিকটস্থ ডাক্তার খুঁজুন
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="px-4 sm:px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 border-purple-500/50 text-purple-400 hover:bg-purple-900/20 hover:border-purple-500 transition-all rounded-xl"
            onClick={() => router.push("/")}
          >
            <ArrowLeft size={16} />
            হোমে ফিরে যান
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
