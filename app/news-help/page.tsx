"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ExternalLink, Newspaper, Globe, ArrowLeft, Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface NewsArticle {
  title: string
  description: string
  content: string
  url: string
  source: string
  date: string
}

interface NewsResponse {
  news: string
}

// Bilingual translations - Bengali and English
const translations = {
  bn: {
    heading: "স্বাস্থ্য সংবাদ পান",
    subheading: "সর্বশেষ স্বাস্থ্য সম্পর্কিত খবর পড়ুন আপনার পছন্দের ভাষায়",
    selectLanguage: "ভাষা নির্বাচন করুন",
    placeholder: "একটি ভাষা নির্বাচন করুন এবং সংবাদ পেতে বাটনে ক্লিক করুন",
    buttonText: "সংবাদ পান",
    loadingText: "সংবাদ লোড হচ্ছে...",
    responseTitle: "সংবাদ ফলাফল",
    homeButtonText: "হোম পেজে ফিরে যান",
    readMore: "আরও পড়ুন",
    errorText: "সংবাদ পেতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
    noNews: "কোনো সংবাদ পাওয়া যায়নি",
  },
  en: {
    heading: "Get Health News",
    subheading: "Read the latest health-related news in your preferred language",
    selectLanguage: "Select Language",
    placeholder: "Select a language and click the button to get news",
    buttonText: "Get News",
    loadingText: "Loading news...",
    responseTitle: "News Results",
    homeButtonText: "Back to Home",
    readMore: "Read More",
    errorText: "Error fetching news. Please try again.",
    noNews: "No news found",
  },
}

export default function NewsHelp() {
  const [language, setLanguage] = useState("Bengali")
  const [uiLang, setUiLang] = useState<"bn" | "en">("bn")
  const [apiResponse, setApiResponse] = useState<NewsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const router = useRouter()

  const t = translations[uiLang]

  const languages = [
    { name: "বাংলা", nameEn: "Bengali", value: "Bengali" },
    { name: "হিন্দি", nameEn: "Hindi", value: "Hindi" },
    { name: "ইংরেজি", nameEn: "English", value: "English" },
    { name: "মারাঠি", nameEn: "Marathi", value: "Marathi" },
    { name: "তামিল", nameEn: "Tamil", value: "Tamil" },
    { name: "তেলেগু", nameEn: "Telugu", value: "Telugu" },
    { name: "গুজরাটি", nameEn: "Gujarati", value: "Gujarati" },
    { name: "পাঞ্জাবি", nameEn: "Punjabi", value: "Punjabi" },
    { name: "মালায়ালম", nameEn: "Malayalam", value: "Malayalam" },
    { name: "কন্নড়", nameEn: "Kannada", value: "Kannada" },
    { name: "ওড়িয়া", nameEn: "Odia", value: "Odia" },
  ]

  const parseNewsResponse = (responseText: string) => {
    try {
      const articleBlocks = responseText.split("\n\nTitle: ")
      const parsedArticles: NewsArticle[] = []

      articleBlocks.forEach((block, index) => {
        if (index === 0 && !block.startsWith("Title: ")) return

        const articleText = index === 0 ? block : "Title: " + block
        const titleMatch = articleText.match(/Title: (.*?)(?:\n|$)/)
        const descriptionMatch = articleText.match(/Description: (.*?)(?:\n|$)/)
        const contentMatch = articleText.match(/Content: ([\s\S]*?)(?:\nURL:|$)/)
        const urlMatch = articleText.match(/URL: (.*?)(?:\n|$)/)
        const sourceMatch = articleText.match(/Source: (.*?)(?:\n|$)/)
        const dateMatch = articleText.match(/Date: (.*?)(?:\n|$)/)

        if (titleMatch) {
          parsedArticles.push({
            title: titleMatch[1] || "",
            description: descriptionMatch ? descriptionMatch[1] : "",
            content: contentMatch ? contentMatch[1] : "",
            url: urlMatch ? urlMatch[1] : "",
            source: sourceMatch ? sourceMatch[1] : "",
            date: dateMatch ? dateMatch[1] : "",
          })
        }
      })

      setArticles(parsedArticles)
    } catch (error) {
      console.error("Error parsing news response:", error)
      setError(t.errorText)
    }
  }

  const handleGetNews = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:5000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setApiResponse(data)

      if (data.news) {
        parseNewsResponse(data.news)
      }
    } catch (error) {
      console.error("Error fetching news:", error)
      setError(t.errorText)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat(uiLang === "bn" ? "bn-IN" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="pt-20 sm:pt-24" />

      {/* Language Toggle - UI Language */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-6 z-10">
        <button
          onClick={() => setUiLang(uiLang === "bn" ? "en" : "bn")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/80 border border-gray-700 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <Globe size={14} />
          {uiLang === "bn" ? "EN" : "বাং"}
        </button>
      </div>

      {/* Hero Search Section */}
      <div className="relative px-4 sm:px-6 py-8 sm:py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
              {t.heading}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              {t.subheading}
            </p>
          </div>

          {/* Search Form Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700/50 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              {/* Language Select */}
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-2">{t.selectLanguage}</label>
                <select
                  className="w-full px-4 py-3 rounded-xl bg-gray-900/80 text-white border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-sm sm:text-base appearance-none cursor-pointer"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    backgroundSize: "20px",
                  }}
                >
                  {languages.map((lang, idx) => (
                    <option key={idx} value={lang.value} className="bg-gray-900">
                      {uiLang === "bn" ? lang.name : lang.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Get News Button */}
              <div className="flex items-end">
                <Button
                  className="w-full sm:w-auto min-w-[160px] flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-sm sm:text-base py-3 rounded-xl shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 h-[48px]"
                  onClick={handleGetNews}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {t.loadingText}
                    </>
                  ) : (
                    <>
                      <Newspaper size={18} />
                      {t.buttonText}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-grow px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-14 h-14 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin mb-4" />
              <p className="text-gray-400 text-lg">{t.loadingText}</p>
            </div>
          ) : error ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-red-500/30">
              <p className="text-red-400">{error}</p>
            </div>
          ) : articles.length > 0 ? (
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-white pb-3 border-b border-gray-700/50">
                {t.responseTitle}
              </h2>

              {/* News Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((article, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-5 flex flex-col hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <h3 className="text-lg font-semibold text-purple-400 mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{article.description}</p>
                    <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                      {article.content.substring(0, 150)}...
                    </p>

                    <div className="flex justify-between items-center text-xs text-gray-500 mb-3 pt-3 border-t border-gray-700/50">
                      <span className="truncate max-w-[120px]">{article.source}</span>
                      <span>{formatDate(article.date)}</span>
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm inline-flex items-center gap-1 transition-colors"
                    >
                      {t.readMore}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 sm:p-12 text-center border border-gray-700/50">
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gray-800/80 flex items-center justify-center mb-5">
                  <Newspaper size={36} className="text-purple-400" />
                </div>
                <p className="text-gray-400 text-base sm:text-lg max-w-md">
                  {t.placeholder}
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
            className="flex items-center justify-center gap-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500 rounded-xl px-5 py-2.5 transition-all"
            onClick={() => router.push("/")}
          >
            <ArrowLeft size={16} />
            {t.homeButtonText}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
