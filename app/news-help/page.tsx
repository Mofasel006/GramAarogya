"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ExternalLink, Search, Newspaper } from "lucide-react"
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

const translations = [
  {
    lang: "বাংলা",
    heading: "স্বাস্থ্য সংবাদ পান",
    placeholder: "একটি ভাষা নির্বাচন করুন...",
    buttonText: "সংবাদ পান",
    loadingText: "সংবাদ লোড হচ্ছে...",
    responseTitle: "সংবাদ ফলাফল",
    homeButtonText: "হোম পেজে ফিরে যান",
    readMore: "আরও পড়ুন",
  },
];

export default function NewsHelp() {
  const [language, setLanguage] = useState("Bengali")
  const [apiResponse, setApiResponse] = useState<NewsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [index, setIndex] = useState(0) // Index for translations
  const router = useRouter()

  const languages = [
    { name: "হিন্দি", value: "Hindi" },
    { name: "মারাঠি", value: "Marathi" },
    { name: "বাংলা", value: "Bengali" },
    { name: "তামিল", value: "Tamil" },
    { name: "তেলেগু", value: "Telugu" },
    { name: "গুজরাটি", value: "Gujarati" },
    { name: "পাঞ্জাবি", value: "Punjabi" },
    { name: "মালায়ালম", value: "Malayalam" },
    { name: "কন্নড়", value: "Kannada" },
    { name: "ওড়িয়া", value: "Odia" },
  ]

  // Find the corresponding translation index based on the selected language
  useEffect(() => {
    setIndex(0)
  }, [language])

  const parseNewsResponse = (responseText: string) => {
    try {
      // Split the response into articles
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
      setError("সংবাদ তথ্য পার্স করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।")
    }
  }

  const handleGetNews = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch news from the API
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
      setError("সংবাদ পেতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("bn-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (e) {
      return dateString
    }
  }

  // Get translation for the currently selected language
  const getTranslation = (key: string) => {
    const currentTranslation = translations[index]
    return currentTranslation[key as keyof typeof currentTranslation] || ""
  }

  return (
    <div className="min-h-screen flex flex-col bg-black dark:bg-black text-white">
      <Navbar />

      {/* Search Section - Fixed at Top */}
      <div className="bg-black dark:bg-black text-white py-8 px-4 shadow-md">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">{getTranslation("heading")}</h1>

          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1">
              <select
                className="w-full px-4 py-3 rounded-lg bg-black dark:bg-black text-white placeholder-gray-400 border border-gray-700"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang, idx) => (
                  <option key={idx} value={lang.value}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleGetNews}
              disabled={loading}
            >
              <Newspaper size={20} />
              {loading ? getTranslation("loadingText") : getTranslation("buttonText")}
            </Button>
          </div>
        </div>
      </div>

      {/* Results Section - Expanded Area Below */}
      <div className="flex-grow dark:bg-black text-white px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300 text-lg">{getTranslation("loadingText")}</p>
            </div>
          ) : error ? (
            <div className="bg-gray-800 rounded-lg shadow-md p-8 text-center border border-gray-700">
              <p className="text-red-400">{error}</p>
            </div>
          ) : articles.length > 0 ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-white pb-2 border-b border-gray-700">
                {translations[index].responseTitle}
              </h2>

              {/* News Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {articles.map((article, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col border border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">{article.title}</h3>
                    <p className="text-gray-300 mb-3">{article.description}</p>
                    <p className="text-gray-400 mb-4 flex-grow">{article.content.substring(0, 150)}...</p>

                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>{article.source}</span>
                      <span>{formatDate(article.date)}</span>
                    </div>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-medium text-sm inline-flex items-center"
                    >
                      {translations[index].readMore}
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="dark:bg-black text-white shadow-md p-8 text-center border border-gray-700 rounded-lg">
              <div className="flex flex-col items-center justify-center py-12">
                <Newspaper size={48} className="text-gray-500 mb-4" />
                <p className="text-gray-400 text-lg">
                  {getTranslation("placeholder")}
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
            {getTranslation("homeButtonText")}
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

