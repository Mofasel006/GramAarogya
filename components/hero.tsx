"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, HeartPulse, User } from "lucide-react"

const translations = [
  { lang: "বাংলা", text: "মা সাথী এআই - আপনার স্বাস্থ্যসঙ্গী" },
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % translations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-background pt-16">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-8 lg:py-12">

          {/* Content Column */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  মা সাথী এআই
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                মা সাথী এআই-এর মাধ্যমে তাৎক্ষণিক এআই-চালিত স্বাস্থ্য পরামর্শ নিন। গর্ভাবস্থা থেকে মাতৃত্ব—আমরা আছি আপনার পাশে।
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <Button
                size="lg"
                className="h-11 px-6 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-all"
                onClick={() => router.push("/health-check")}
              >
                স্বাস্থ্য পরীক্ষা শুরু করুন
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-6 text-sm border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-50 transition-all"
                onClick={() => router.push("/find-doctor")}
              >
                ডাক্তার খুঁজুন
              </Button>
            </motion.div>
          </div>

          {/* Image Column - Highlighting the User's Image */}
          <motion.div
            className="flex-1 w-full max-w-[550px]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-100 dark:border-purple-900/20">
              <img
                src="/logo.svg"
                alt="MaaSathi AI"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop";
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

