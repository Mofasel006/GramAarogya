"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UrbanRuralDisparity } from "@/components/charts/UrbanRuralDisparity"
import { HealthConditionsChart } from "@/components/charts/HealthConditionsChart"
import { HealthcareAccessMap } from "@/components/charts/HealthcareAccessMap"
import { LifeExpectancyTrend } from "@/components/charts/LifeExpectancyTrend"
import { ChildMortalityRate } from "@/components/charts/ChildMortalityRate"
import { Globe } from "lucide-react"

type Language = "bn" | "en"

const translations = {
  bn: {
    title: "স্বাস্থ্য অন্তর্দৃষ্টি",
    subtitle: "বাংলাদেশের শহর ও গ্রামের স্বাস্থ্যসেবা বৈষম্য",
    urbanRural: "শহর-গ্রাম",
    conditions: "স্বাস্থ্যগত অবস্থা",
    lifeExpectancy: "গড় আয়ু",
    childMortality: "শিশু মৃত্যুহার",
    keyPoints: "মূল বিষয়সমূহ",
    points: [
      "বাংলাদেশের শহর ও গ্রামীণ এলাকার স্বাস্থ্য ফলাফলে উল্লেখযোগ্য বৈষম্য বিদ্যমান।",
      "শহরাঞ্চলের তুলনায় গ্রামীণ এলাকায় কিছু নির্দিষ্ট স্বাস্থ্য সমস্যার বিস্তার বেশি।",
      "বাংলাদেশের বিভিন্ন অঞ্চলে স্বাস্থ্যসেবা পাওয়ার সুযোগ ব্যাপকভাবে পরিবর্তিত হয়।",
      "গত কয়েক দশকে বাংলাদেশে গড় আয়ু ক্রমাগত বৃদ্ধি পাচ্ছে।",
      "শিশু মৃত্যুহার উল্লেখযোগ্যভাবে হ্রাস পেয়েছে, তবে উন্নতির আরও সুযোগ রয়েছে।"
    ]
  },
  en: {
    title: "Health Insights",
    subtitle: "Healthcare Disparities in Urban & Rural Bangladesh",
    urbanRural: "Urban-Rural",
    conditions: "Health Conditions",
    lifeExpectancy: "Life Expectancy",
    childMortality: "Child Mortality",
    keyPoints: "Key Points",
    points: [
      "Significant disparities exist in health outcomes between urban and rural areas in Bangladesh.",
      "Certain health problems are more prevalent in rural areas compared to urban areas.",
      "Access to healthcare varies widely across different regions of Bangladesh.",
      "Life expectancy in Bangladesh has been steadily increasing over the past decades.",
      "Child mortality rates have significantly decreased, but there is still room for improvement."
    ]
  }
}

export default function HealthInsights() {
  const [activeTab, setActiveTab] = useState("disparity")
  const [language, setLanguage] = useState<Language>("bn")
  
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />
      {/* Spacer for fixed navbar */}
      <div className="pt-20 sm:pt-24" />
      <main className="container mx-auto px-4 py-8 sm:py-12">
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

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-3">
            {t.title}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <Tabs defaultValue="disparity" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 bg-purple-900/20">
            <TabsTrigger value="disparity" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              {t.urbanRural}
            </TabsTrigger>
            <TabsTrigger value="conditions" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              {t.conditions}
            </TabsTrigger>
            <TabsTrigger value="life-expectancy" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              {t.lifeExpectancy}
            </TabsTrigger>
            <TabsTrigger value="child-mortality" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              {t.childMortality}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="disparity">
            <Card className="border-purple-900/30">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="text-base sm:text-xl md:text-2xl text-purple-400">
                  বাংলাদেশে শহর ও গ্রামের স্বাস্থ্য বৈষম্য
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-gray-400">
                  শহর ও গ্রামীণ এলাকার স্বাস্থ্য নির্দেশকগুলোর তুলনা
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 sm:pt-4 md:pt-6 px-2 sm:px-6 pb-4 sm:pb-6">
                <div className="h-[300px] sm:h-[350px] md:h-[400px]">
                  <UrbanRuralDisparity />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="conditions">
            <Card className="border-purple-900/30">
              <CardHeader>
                <CardTitle className="text-purple-400">বাংলাদেশে স্বাস্থ্যগত অবস্থার বিস্তার</CardTitle>
                <CardDescription className="text-gray-400">শহর ও গ্রামীণ এলাকায় সাধারণ স্বাস্থ্য সমস্যার বণ্টন</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <HealthConditionsChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="life-expectancy">
            <Card className="border-purple-900/30">
              <CardHeader>
                <CardTitle className="text-purple-400">বাংলাদেশে গড় আয়ুর প্রবণতা</CardTitle>
                <CardDescription className="text-gray-400">বাংলাদেশে গড় আয়ুর ঐতিহাসিক প্রবণতা</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <LifeExpectancyTrend />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="child-mortality">
            <Card className="border-purple-900/30">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  {language === "bn" ? "বাংলাদেশে শিশু মৃত্যুহার" : "Child Mortality in Bangladesh"}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {language === "bn" ? "বাংলাদেশে ৫ বছরের কম বয়সী শিশু মৃত্যুহারের প্রবণতা" : "Under-5 mortality rate trends in Bangladesh"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ChildMortalityRate />
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">{t.keyPoints}</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            {t.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}

