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

export default function HealthInsights() {
  const [activeTab, setActiveTab] = useState("disparity")

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
          স্বাস্থ্য অন্তর্দৃষ্টি: বাংলাদেশের শহর ও গ্রামের বৈষম্য
        </motion.h1>

        <Tabs defaultValue="disparity" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 bg-purple-900/20">
            <TabsTrigger value="disparity" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              শহর-গ্রাম
            </TabsTrigger>
            <TabsTrigger value="conditions" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              স্বাস্থ্যগত অবস্থা
            </TabsTrigger>
            <TabsTrigger value="life-expectancy" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              গড় আয়ু
            </TabsTrigger>
            <TabsTrigger value="child-mortality" className="text-xs sm:text-sm data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              শিশু মৃত্যুহার
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
                <CardTitle className="text-purple-400">বাংলাদেশে শিশু মৃত্যুহার</CardTitle>
                <CardDescription className="text-gray-400">বাংলাদেশে ৫ বছরের কম বয়সী শিশু মৃত্যুহারের প্রবণতা</CardDescription>
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
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">মূল বিষয়সমূহ</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>বাংলাদেশের শহর ও গ্রামীণ এলাকার স্বাস্থ্য ফলাফলে উল্লেখযোগ্য বৈষম্য বিদ্যমান।</li>
            <li>শহরাঞ্চলের তুলনায় গ্রামীণ এলাকায় কিছু নির্দিষ্ট স্বাস্থ্য সমস্যার বিস্তার বেশি।</li>
            <li>বাংলাদেশের বিভিন্ন অঞ্চলে স্বাস্থ্যসেবা পাওয়ার সুযোগ ব্যাপকভাবে পরিবর্তিত হয়।</li>
            <li>গত কয়েক দশকে বাংলাদেশে গড় আয়ু ক্রমাগত বৃদ্ধি পাচ্ছে।</li>
            <li>শিশু মৃত্যুহার উল্লেখযোগ্যভাবে হ্রাস পেয়েছে, তবে উন্নতির আরও সুযোগ রয়েছে।</li>
            <li>
              এই বৈষম্যগুলি দূর করতে এবং বাংলাদেশের সামগ্রিক স্বাস্থ্য ফলাফলের উন্নতির জন্য নির্দিষ্ট পদক্ষেপ প্রয়োজন।
            </li>
          </ul>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}

