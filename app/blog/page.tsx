"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Clock, Bookmark, Search, ChevronRight, Globe, Heart, Baby, Brain, Apple, Activity, Shield, Lightbulb, X, Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"

type Language = "bn" | "en"

const translations = {
  bn: {
    title: "আরোগ্যব্লগ",
    subtitle: "আপনার স্বাস্থ্য সচেতনতার বিশ্বস্ত সঙ্গী",
    searchPlaceholder: "ব্লগ খুঁজুন...",
    categories: "ক্যাটাগরি",
    allCategories: "সব",
    featured: "বিশেষ নিবন্ধ",
    latestPosts: "সাম্প্রতিক পোস্ট",
    readMore: "আরও পড়ুন",
    minRead: "মিনিট পড়ুন",
    mythVsFact: "ভুল ধারণা vs সত্য",
    mythLabel: "ভুল ধারণা (Myth)",
    factLabel: "সত্য (Fact)",
    offlineAccess: "অফলাইন অ্যাক্সেস",
    offlineDesc: "ব্লগগুলো ডাউনলোড করা হয়েছে। এখন আপনি ইন্টারনেট ছাড়াই পড়তে পারবেন।",
    viewOffline: "অফলাইন ব্লগ দেখুন",
    features: {
      aiPersonalized: "AI-ব্যক্তিগতকৃত ব্লগ",
      localLanguage: "স্থানীয় ভাষা সমর্থন",
      mythFact: "ভুল ধারণা vs সত্য",
      offline: "অফলাইন অ্যাক্সেস"
    },
    categoryNames: {
      nutrition: "পুষ্টি ও খাবার",
      exercise: "ব্যায়াম ও যোগা",
      bodyChanges: "শরীরের পরিবর্তন",
      mentalHealth: "মানসিক স্বাস্থ্য",
      babyDev: "সন্তানের বিকাশ",
      delivery: "প্রসব ও পরবর্তী যত্ন",
      tips: "সচেতনতা ও টিপস",
      mythFact: "Myth vs. Fact"
    },
    blogs: [
      {
        id: 1,
        title: "৫ম সপ্তাহে কী খাবেন?",
        excerpt: "এই সপ্তাহে আপনার ও আপনার শিশুর জন্য পুষ্টিকর খাদ্যতালিকা জানুন।",
        category: "nutrition",
        readTime: 5,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400"
      },
      {
        id: 2,
        title: "৫ম সপ্তাহে কী ব্যায়াম করবেন?",
        excerpt: "সহজ ও নিরাপদ ব্যায়ামের তালিকা যা গর্ভাবস্থায় সাহায্য করবে।",
        category: "exercise",
        readTime: 4,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
      },
      {
        id: 3,
        title: "শরীরের পরিবর্তন",
        excerpt: "এই সপ্তাহে আপনার শরীরে কী কী পরিবর্তন হবে তা জানুন।",
        category: "bodyChanges",
        readTime: 6,
        image: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=400"
      },
      {
        id: 4,
        title: "গর্ভাবস্থায় মানসিক স্বাস্থ্য",
        excerpt: "মানসিক চাপ কমানোর উপায় ও সুস্থ মন বজায় রাখার টিপস।",
        category: "mentalHealth",
        readTime: 7,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400"
      },
      {
        id: 5,
        title: "গর্ভাবস্থায় গ্রামের মায়েদের জন্য গুরুত্বপূর্ণ টিপস",
        excerpt: "গ্রামের পরিবেশে গর্ভাবস্থায় একটু আলাদা যত্ন চায়। এখানে কিছু সহজ টিপস দেওয়া হলো।",
        category: "tips",
        readTime: 8,
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400"
      },
      {
        id: 6,
        title: "নবজাতকের যত্ন",
        excerpt: "জন্মের পর প্রথম মাসে শিশুর যত্ন কীভাবে নেবেন।",
        category: "babyDev",
        readTime: 6,
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400"
      }
    ],
    myths: [
      {
        myth: "গর্ভাবস্থায় পেঁপে খেলে বাচ্চার ক্ষতি হয়।",
        fact: "পরিমিত পরিমাণে পাকা পেঁপে খেলে কোনো ক্ষতি হয় না, এটি উপকারী।"
      },
      {
        myth: "গর্ভাবস্থায় ব্যায়াম করা উচিত নয়।",
        fact: "হালকা ব্যায়াম গর্ভাবস্থায় অত্যন্ত উপকারী এবং ডাক্তাররা এটি সুপারিশ করেন।"
      }
    ]
  },
  en: {
    title: "ArogyaBlog",
    subtitle: "Your Trusted Health Awareness Companion",
    searchPlaceholder: "Search blogs...",
    categories: "Categories",
    allCategories: "All",
    featured: "Featured Article",
    latestPosts: "Latest Posts",
    readMore: "Read More",
    minRead: "min read",
    mythVsFact: "Myth vs Fact",
    mythLabel: "Myth",
    factLabel: "Fact",
    offlineAccess: "Offline Access",
    offlineDesc: "Blogs have been downloaded. You can now read without internet.",
    viewOffline: "View Offline Blogs",
    features: {
      aiPersonalized: "AI-Personalized Blogs",
      localLanguage: "Local Language Support",
      mythFact: "Myth vs. Fact",
      offline: "Offline Access"
    },
    categoryNames: {
      nutrition: "Nutrition & Food",
      exercise: "Exercise & Yoga",
      bodyChanges: "Body Changes",
      mentalHealth: "Mental Health",
      babyDev: "Baby Development",
      delivery: "Delivery & Postnatal",
      tips: "Awareness & Tips",
      mythFact: "Myth vs. Fact"
    },
    blogs: [
      {
        id: 1,
        title: "What to Eat in Week 5?",
        excerpt: "Learn about the nutritious diet for you and your baby this week.",
        category: "nutrition",
        readTime: 5,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400"
      },
      {
        id: 2,
        title: "Week 5 Exercise Guide",
        excerpt: "Safe and easy exercises that help during pregnancy.",
        category: "exercise",
        readTime: 4,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
      },
      {
        id: 3,
        title: "Body Changes This Week",
        excerpt: "Understand what changes your body will go through this week.",
        category: "bodyChanges",
        readTime: 6,
        image: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=400"
      },
      {
        id: 4,
        title: "Mental Health During Pregnancy",
        excerpt: "Tips to reduce stress and maintain a healthy mind.",
        category: "mentalHealth",
        readTime: 7,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400"
      },
      {
        id: 5,
        title: "Important Tips for Rural Mothers",
        excerpt: "Pregnancy in rural areas needs special care. Here are some simple tips.",
        category: "tips",
        readTime: 8,
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400"
      },
      {
        id: 6,
        title: "Newborn Care",
        excerpt: "How to take care of your baby in the first month after birth.",
        category: "babyDev",
        readTime: 6,
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400"
      }
    ],
    myths: [
      {
        myth: "Eating papaya during pregnancy harms the baby.",
        fact: "Eating ripe papaya in moderation is not harmful and is actually beneficial."
      },
      {
        myth: "Exercise should be avoided during pregnancy.",
        fact: "Light exercise is very beneficial during pregnancy and is recommended by doctors."
      }
    ]
  }
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  nutrition: <Apple className="w-5 h-5" />,
  exercise: <Activity className="w-5 h-5" />,
  bodyChanges: <Heart className="w-5 h-5" />,
  mentalHealth: <Brain className="w-5 h-5" />,
  babyDev: <Baby className="w-5 h-5" />,
  delivery: <Heart className="w-5 h-5" />,
  tips: <Lightbulb className="w-5 h-5" />,
  mythFact: <Shield className="w-5 h-5" />
}

export default function BlogPage() {
  const [language, setLanguage] = useState<Language>("bn")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  const t = translations[language]

  const filteredBlogs = t.blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", "nutrition", "exercise", "bodyChanges", "mentalHealth", "babyDev", "tips", "mythFact"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-20 sm:pt-24" />

      {/* Hero Section with Featured Image */}
      <section className="relative px-4 sm:px-6 py-8 sm:py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto">
          {/* Language Toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 hover:border-purple-500 transition-all"
            >
              <Globe className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">{language === "bn" ? "English" : "বাংলা"}</span>
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3"
            >
              {t.title}
            </motion.h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          {/* Features Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-7 h-7 text-purple-600" />
                  Educational Blogs & Content
                </h2>
                <div className="space-y-2">
                  {Object.entries(t.features).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-purple-600" />
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rHPt4AA5YYhXxWMuSeDfBCiQVaB7mc.png"
                  alt="Educational Blogs"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-800/50 text-white placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
            />
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center">{t.categories}</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {cat !== "all" && categoryIcons[cat]}
                  {cat === "all" ? t.allCategories : t.categoryNames[cat as keyof typeof t.categoryNames]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{t.latestPosts}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-purple-600/90 text-white text-xs font-medium">
                      {t.categoryNames[blog.category as keyof typeof t.categoryNames]}
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <Bookmark className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      {blog.readTime} {t.minRead}
                    </span>
                    <span className="flex items-center gap-1 text-purple-400 text-sm font-medium group-hover:gap-2 transition-all">
                      {t.readMore}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Myth vs Fact Section */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">{t.mythVsFact}</h2>
          <p className="text-gray-400 text-center mb-8">
            {language === "bn" ? "ভুল ধারণা ভাঙুন, সঠিক তথ্য জানুন" : "Break misconceptions, know the truth"}
          </p>
          
          <div className="space-y-6">
            {t.myths.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Myth Card */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-full bg-red-500">
                      <X className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-red-400">{t.mythLabel}</span>
                  </div>
                  <p className="text-gray-300">{item.myth}</p>
                </div>

                {/* Fact Card */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-full bg-green-500">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-green-400">{t.factLabel}</span>
                  </div>
                  <p className="text-gray-300">{item.fact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Insights Infographic Section */}
      <section className="px-4 sm:px-6 py-12 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {language === "bn" ? "স্বাস্থ্য অন্তর্দৃষ্টি" : "Health Insights"}
          </h2>
          <p className="text-gray-400 text-center mb-8">
            {language === "bn" ? "বাংলাদেশের শহর ও গ্রামের স্বাস্থ্যসেবা বৈষম্য" : "Healthcare Disparities in Urban & Rural Bangladesh"}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-S0vmqqRXHjWopIDPyXmxqWvHzHYvf6.png"
                alt="Health Insights Infographic"
                width={800}
                height={1200}
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZfddUxqypAafSYUTTCZGh3MtUnWmTM.png"
                alt="Health Insights Statistics"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Features Showcase */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {language === "bn" ? "আমাদের অ্যাপ ফিচারস" : "Our App Features"}
          </h2>
          <p className="text-gray-400 text-center mb-8">
            {language === "bn" ? "সম্পূর্ণ স্বাস্থ্যসেবা প্ল্যাটফর্ম" : "Complete Healthcare Platform"}
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-gray-700/50"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qhQ4QjeUNcWVDHe3iRU6aJlgwEQHXT.png"
              alt="App Features Showcase"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Offline Access Card */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 text-center border border-purple-500/30"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">{t.offlineAccess}</h3>
            <p className="text-gray-400 mb-4">{t.offlineDesc}</p>
            <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
              {t.viewOffline}
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
