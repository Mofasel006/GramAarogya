"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const translations = [
  { lang: "বাংলা", heading: "স্বাস্থ্য পরীক্ষা", placeholder: "আপনার উপসর্গ বর্ণনা করুন..." },
]

const loadingMessages = [
  "প্রক্রিয়াকরণ হচ্ছে...",
  "উপসর্গ বিশ্লেষণ করা হচ্ছে...",
  "পরামর্শ তৈরি করা হচ্ছে...",
  "প্রায় শেষ...",
  "তথ্য সংগ্রহ করা হচ্ছে...",
]

export default function HealthCheck() {
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()
  const messageRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % translations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (loading) {
      interval = setInterval(() => {
        setLoadingMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length)
        setCurrentIndex(0)
        setCurrentMessage("")
      }, 3000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [loading])

  useEffect(() => {
    if (loading) {
      const message = loadingMessages[loadingMessageIndex]
      const timeout = setTimeout(() => {
        setCurrentMessage(() => {
          if (currentIndex < message.length) {
            return message.substring(0, currentIndex + 1)
          } else {
            return message
          }
        })
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [loading, loadingMessageIndex, currentIndex])

  const handleSubmit = async () => {
    setLoading(true)
    setResponse("")
    setSummary("")

    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      })

      const data = await res.json()
      setResponse(data.response || "কোনো প্রতিক্রিয়া পাওয়া যায়নি।")
      setSummary(data.summary || "কোনো বিস্তারিত প্রতিক্রিয়া পাওয়া যায়নি।")
    } catch (error) {
      console.error("Error fetching response:", error)
      setResponse("এআই স্বাস্থ্য পরামর্শ পেতে সমস্যা হচ্ছে।")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
        <Navbar />
        {/* Spacer for fixed navbar */}
        <div className="pt-20 sm:pt-24" />
        <section className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-5xl mx-auto bg-dark shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
              {translations[index].heading}
            </h1>

            <textarea
              className="w-full h-24 sm:h-32 md:h-48 p-3 sm:p-4 border border-gray-300 rounded-lg text-xs sm:text-sm md:text-base mb-3 sm:mb-4 bg-black text-white placeholder-white"
              placeholder={translations[index].placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              className="w-full sm:w-auto mb-4 sm:mb-6 py-2 px-3 sm:px-4 bg-purple-600 text-white rounded-lg transition-all hover:bg-purple-700 text-sm sm:text-base"
              size="lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <span ref={messageRef}>{currentMessage}</span> : "এআই স্বাস্থ্য পরামর্শ নিন"}
            </Button>

            {loading && (
              <div className="flex justify-center items-center space-x-2 my-3 sm:my-4">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full animate-bounce delay-200"></div>
              </div>
            )}

            {(response || summary) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                <div className="p-4 sm:p-6 bg-dark text-white rounded-lg w-full max-h-60 sm:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold pb-3 sm:pb-5">
                    <strong>এআই প্রতিক্রিয়া</strong>
                  </h2>
                  <div className="space-y-2">
                    {response.split("\n").map((item, index) => (
                      <p
                        key={index}
                        className="text-xs sm:text-sm md:text-base before:content-['•'] before:mr-2 before:text-white-400"
                      >
                        {item.trim()}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="p-4 sm:p-6 bg-dark text-white rounded-lg w-full max-h-60 sm:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold pb-3 sm:pb-5">
                    <strong>বিস্তারিত প্রতিক্রিয়া</strong>
                  </h2>
                  <div className="text-xs sm:text-sm md:text-base whitespace-pre-wrap">{summary}</div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-3 sm:space-y-0 mt-4 sm:mt-6">
              <Button
                className="w-full sm:w-auto py-2 px-3 sm:px-4 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all text-sm sm:text-base"
                variant="outline"
                size="lg"
                onClick={() => router.push("/find-doctor")}
              >
                ডাক্তার খুঁজুন?
              </Button>
              <Button
                className="w-full sm:w-auto py-2 px-3 sm:px-4 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all text-sm sm:text-base"
                variant="outline"
                size="lg"
                onClick={() => router.push("/")}
              >
                হোমে ফিরে যান
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

