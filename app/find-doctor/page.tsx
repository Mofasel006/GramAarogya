"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
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
      setApiResponse({ error: "ডাক্তারদের তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।" })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-black dark:bg-black text-white">
      <Navbar />

      {/* Search Section - Fixed at Top */}
      <div className="bg-black dark:bg-black text-white py-6 sm:py-8 px-3 sm:px-4 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">নিকটস্থ ডাক্তার খুঁজুন</h1>

          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch">
            <div className="flex-1">
              <input
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black dark:bg-black text-white placeholder-gray-400 border border-gray-700 text-sm sm:text-base"
                placeholder="আপনার শারীরিক সমস্যা লিখুন..."
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <input
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black dark:bg-black text-white placeholder-gray-400 border border-gray-700 text-sm sm:text-base"
                placeholder="আপনার অবস্থান লিখুন..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <Button
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base py-2 sm:py-3"
              onClick={handleFindDoctors}
              disabled={loading}
            >
              <Search size={16} className="sm:size-20" />
              {loading ? "অনুসন্ধান করা হচ্ছে..." : "ডাক্তার খুঁজুন"}
            </Button>
          </div>
        </div>
      </div>

      {/* Results Section - Expanded Area Below */}
      <div className="flex-grow dark:bg-black text-white px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {apiResponse && apiResponse.doctors ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-white pb-2 border-b border-gray-700">ডাক্তার পাওয়া গেছে</h2>

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
                        className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 flex flex-col border border-gray-700"
                      >
                        <h3 className="text-lg sm:text-xl font-semibold text-purple-400 mb-2">{doctorInfo["Name"]}</h3>

                        <div className="mb-3 sm:mb-4">
                          <span className="inline-block bg-purple-900 text-purple-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            {doctorInfo["Specialization"]}
                          </span>
                        </div>

                        <div className="space-y-2 sm:space-y-3 text-gray-300 flex-grow text-sm sm:text-base">
                          <p className="flex items-start">
                            <span className="font-medium min-w-16 sm:min-w-24 inline-block">অভিজ্ঞতা:</span>
                            <span>{doctorInfo["Experience"]}</span>
                          </p>

                          <p className="flex items-start">
                            <span className="font-medium min-w-16 sm:min-w-24 inline-block">ফি:</span>
                            <span>{doctorInfo["Consultation Fee"]}</span>
                          </p>

                          <p className="flex items-start">
                            <span className="font-medium min-w-16 sm:min-w-24 inline-block">অবস্থান:</span>
                            <span className="text-xs sm:text-sm">{doctorInfo["Location"]}</span>
                          </p>
                        </div>

                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700">
                          <Link
                            href={doctorInfo["About Doctor"] || "#"}
                            target="_blank"
                            className="text-purple-400 hover:text-purple-300 font-medium text-xs sm:text-sm inline-flex items-center"
                          >
                            প্রোফাইল দেখুন
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-4 sm:w-4 ml-1"
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
          ) : (
            <div className="dark:bg-black text-white shadow-md p-8 text-center border border-gray-700 rounded-lg">
              <div className="flex flex-col items-center justify-center py-12">
                <Search size={48} className="text-gray-500 mb-4" />
                <p className="text-gray-400 text-lg">
                  আপনার শারীরিক সমস্যা এবং অবস্থান লিখে নিকটস্থ ডাক্তার খুঁজুন
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="dark:bg-black text-white pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            onClick={() => router.push("/")}
          >
            হোমে ফিরে যান
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

