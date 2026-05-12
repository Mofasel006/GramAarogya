"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react" // Icons for dropdown

import { HeartPulse, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "./ui/button"

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/30 py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md shadow-purple-500/20">
            <HeartPulse className="text-white h-5 w-5" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            মা সাথী এআই
          </span>
        </Link>

        {/* Desktop Navbar Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          <Link href="/health-check" className="text-muted-foreground hover:text-purple-600 transition-colors">
            আরোগ্য এআই
          </Link>
          <Link href="/find-doctor" className="text-muted-foreground hover:text-purple-600 transition-colors">
            আরোগ্যকানেক্ট
          </Link>
          <Link href="/g-map" className="text-muted-foreground hover:text-purple-600 transition-colors">
            আরোগ্যম্যাপ
          </Link>
          <Link href="/news-help" className="text-muted-foreground hover:text-purple-600 transition-colors">
            আরোগ্যপালস
          </Link>
          <Link href="/health-insights" className="text-muted-foreground hover:text-purple-600 transition-colors">
            আরোগ্যভিউ
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            className="hidden sm:flex bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
            onClick={() => router.push("/health-check")}
          >
            শুরু করুন
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="lg:hidden p-2 text-muted-foreground hover:text-purple-600 transition-colors"
          >
            {dropdownOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-purple-100 dark:border-purple-900/30 overflow-hidden"
          >
            <div className="container py-6 flex flex-col space-y-4">
              <Link href="/health-check" className="text-lg font-medium py-2 hover:text-purple-600" onClick={() => setDropdownOpen(false)}>
                আরোগ্য এআই
              </Link>
              <Link href="/find-doctor" className="text-lg font-medium py-2 hover:text-purple-600" onClick={() => setDropdownOpen(false)}>
                আরোগ্যকানেক্ট
              </Link>
              <Link href="/g-map" className="text-lg font-medium py-2 hover:text-purple-600" onClick={() => setDropdownOpen(false)}>
                আরোগ্যম্যাপ
              </Link>
              <Link href="/news-help" className="text-lg font-medium py-2 hover:text-purple-600" onClick={() => setDropdownOpen(false)}>
                আরোগ্যপালস
              </Link>
              <Link href="/health-insights" className="text-lg font-medium py-2 hover:text-purple-600" onClick={() => setDropdownOpen(false)}>
                আরোগ্যভিউ
              </Link>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-6 mt-4"
                onClick={() => {
                  router.push("/health-check")
                  setDropdownOpen(false)
                }}
              >
                শুরু করুন
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// Remove the old unused translations
const translations = [
  { lang: "বাংলা", text: "মা সাথী এআই" },
]

const greetings = [
  { lang: "বাংলা", text: "স্বাগতম" },
]

