"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Article {
  title: string
  description: string
  content: string
  url: string
  source: string
  publishedAt: string
}

export default function AboutUs() {
  const [articles, setArticles] = useState<Article[]>([])
  const [summary, setSummary] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Mock data for demonstration
    const mockArticles = [
      {
        title: "পুষ্টির ভাণ্ডার, স্বাস্থ্যের জন্য সেরা",
        description:
          "চিনাবাদামের পুষ্টি, স্বাস্থ্য সুবিধা, অ্যান্টিঅক্সিডেন্ট, হৃদরোগের স্বাস্থ্য, মস্তিষ্কের স্বাস্থ্য, রক্তে শর্করা, ফাইবার, ভিটামিন, খনিজ, স্বাস্থ্যকর স্ন্যাকস",
        content:
          "Meta AI দ্বারা তৈরি চিত্র\n● চিনাবাদামে প্রচুর প্রোটিন এবং ফাইবার থাকে, যা শরীরকে শক্তি দেয় এবং ক্ষুধা কমায়।",
        url: "https://www.kvartha.com/health/nilakkadala-poshakangal/cid16320742.htm",
        source: "কেওয়ারথা | KVARTHA.COM",
        publishedAt: "2025-03-05T05:43:54Z",
      },
      {
        title: "ভারতে সোয়াইন ফ্লুর প্রকোপ! দেশের রাজধানীতে ৩০০০-এর বেশি আক্রান্ত, জানুন বাঁচার সহজ উপায়",
        description:
          "Swine Flu Cases In Delhi: দিল্লিতে সোয়াইন ফ্লু ভাইরাস দ্রুত ছড়িয়ে পড়ছে। এই ভাইরাসের সংক্রমণ আরও বাড়ার সম্ভাবনা রয়েছে। জানুন এই ভাইরাসটি কী এবং কীভাবে এটি থেকে নিজেকে রক্ষা করবেন?",
        content:
          "swine flu cases\nSwine Flu Cases: ভারতে সোয়াইন ফ্লুর প্রকোপ দ্রুত বাড়ছে। দেশের রাজধানী দিল্লিতে ৩০০০-এর বেশি আক্রান্তের খবর পাওয়া গেছে।",
        url: "https://www.timesnowhindi.com/health/swine-flu-cases-in-delhi-reported-thousand-of-cases-in-swine-flu-know-prevention-tips-in-hindi-article-118724073",
        source: "Times Now Navbharat",
        publishedAt: "2025-03-05T04:32:07Z",
      },
      {
        title: "ওয়েট ট্রেনিংয়ের টিপস",
        description:
          "ব্যায়ামের সময় সতর্কতা অবলম্বন না করলে পেশিতে টানের সমস্যা হতে পারে। ফিটনেস লেভেল এবং বয়সের ভিত্তিতে ব্যায়ামে বিভিন্ন পরিবর্তন আনা প্রয়োজন।",
        content:
          "ব্যায়ামের সময় সতর্কতা অবলম্বন না করলে পেশিতে টানের সমস্যা হতে পারে। ফিটনেস লেভেল এবং বয়সের ভিত্তিতে ব্যায়ামে বিভিন্ন পরিবর্তন আনা প্রয়োজন।",
        url: "https://www.healthshots.com/hindi/fitness/weight-training-things-to-remember-to-avoid-injuries/",
        source: "Healthshots Hindi",
        publishedAt: "2025-03-05T02:30:37Z",
      },
    ]

    const mockSummary = `স্বাস্থ্য সংবাদ নিবন্ধের সারাংশ (৪-৫ মার্চ, ২০২৫)

এই সারাংশটি প্রদত্ত সংবাদ নিবন্ধগুলি থেকে প্রধান স্বাস্থ্য প্রবণতা এবং চিকিৎসা সংক্রান্ত প্রভাবগুলিকে তুলে ধরে।

I. সংক্রামক রোগের প্রকোপ:

* টেক্সাসে হামের প্রকোপ: টেক্সাসে হামের উল্লেখযোগ্য প্রকোপ দেখা দিয়েছে, যার কারণে সিডিসি একটি প্রতিক্রিয়া দল পাঠিয়েছে।
* দিল্লিতে সোয়াইন ফ্লু: দিল্লিতে ৩০০০-এর বেশি সোয়াইন ফ্লু আক্রান্তের খবর পাওয়া গেছে, যা সংক্রমণের উদ্বেগজনক বৃদ্ধির ইঙ্গিত দেয়।
* কেরালাতে নিপাহ ভাইরাস অ্যালার্ট: ফ্রুট ব্যাটের প্রজনন ঋতুর কারণে কেরালার পাঁচটি জেলার হাসপাতাল নিপাহ ভাইরাসের জন্য সতর্ক অবস্থানে রয়েছে।`

    setArticles(mockArticles)
    setSummary(mockSummary)
    setIsLoading(false)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("bn-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="pt-20 sm:pt-24" />
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          স্বাস্থ্য সংবাদ আপডেট
        </motion.h1>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-lg text-gray-300">সংবাদ লোড হচ্ছে...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4 bg-purple-600 hover:bg-purple-700">
              আবার চেষ্টা করুন
            </Button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col border-purple-900/30 bg-gray-900/50">
                    <CardHeader className="p-3 sm:p-6">
                      <CardTitle className="text-base sm:text-lg md:text-xl text-purple-400">{article.title}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-gray-400">
                        {formatDate(article.publishedAt)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow p-3 sm:p-6 pt-0 sm:pt-0">
                      <p className="mb-2 sm:mb-4 text-xs sm:text-sm text-gray-400">
                        {article.description}
                      </p>
                      <p className="text-xs sm:text-sm line-clamp-3 text-gray-300">{article.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center p-3 sm:p-6">
                      <span className="text-xs text-gray-500">{article.source}</span>
                      <Button asChild variant="outline" size="sm" className="h-8 text-xs sm:text-sm border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          আরও পড়ুন <ExternalLink className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12"
              >
                <Card className="border-purple-900/30 bg-gray-900/50">
                  <CardHeader>
                    <CardTitle className="text-purple-400">সংবাদ সারাংশ</CardTitle>
                    <CardDescription className="text-gray-400">প্রধান স্বাস্থ্য প্রবণতা এবং চিকিৎসা সংক্রান্ত প্রভাব</CardDescription>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    <div className="whitespace-pre-line">{summary}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

