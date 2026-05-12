"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Github, Linkedin, Mail, User, UserCircle } from "lucide-react"

const teamMembers = [
  {
    name: "Siddharth Mishra",
    role: "এআই ডেভেলপার",
    bio: "সিদ্ধার্থ একজন দক্ষ এআই ডেভেলপার যার ডিপ লার্নিং এবং ন্যাচারাল ল্যাঙ্গুয়েজ প্রসেসিংয়ে দক্ষতা রয়েছে। তিনি স্বাস্থ্যসেবা এবং অটোমেশনের জন্য এআই-চালিত সমাধান তৈরিতে বিশেষজ্ঞ।",
    links: {
      github: "https://github.com/Sid3503",
      linkedin: "https://www.linkedin.com/in/siddharth-mishra-0a5227228/",
      email: "mishrasiddharth072@gmail.com",
    },
  },
  {
    name: "Manoday Kadam",
    role: "এআই ডেভেলপার ও ক্লাউড বিশেষজ্ঞ",
    bio: "মনোদয় একজন এআই ডেভেলপার যার ক্লাউড কম্পিউটিং এবং স্কেলেবল এআই সমাধানে শক্তিশালী অভিজ্ঞতা রয়েছে। তিনি বাস্তব জীবনের প্রয়োগের জন্য ক্লাউড প্ল্যাটফর্মে এআই মডেল মোতায়েন করতে পারদর্শী।",
    links: {
      github: "https://github.com/Manoday10",
      linkedin: "https://www.linkedin.com/in/manoday-kadam-3b1a74268/",
      email: "manodaykadam105@gmail.com",
    },
  },
  {
    name: "Prachiti Palande",
    role: "ইউআই/ইউএক্স বিশেষজ্ঞ",
    bio: "প্রাচিতি একজন সৃজনশীল ইউআই/ইউএক্স ডিজাইনার যিনি স্বজ্ঞাত এবং আকর্ষণীয় ব্যবহারকারীর অভিজ্ঞতা তৈরির দিকে মনোনিবেশ করেন। তিনি নিশ্চিত করেন যে এআই-চালিত অ্যাপ্লিকেশনগুলি ব্যবহারকারী-বান্ধব হয়।",
    links: {
      github: "https://github.com/mikejohnson",
      linkedin: "https://linkedin.com/in/mikejohnson",
      email: "prachitipalande191@gmail.com",
    },
  },
  {
    name: "Priyadarshini Chavan",
    role: "ফ্রন্টেন্ড ডিজাইনার ও এমএল বিশেষজ্ঞ",
    bio: "প্রিয়দর্শিনী একজন ফ্রন্টেন্ড ডিজাইনার যার মেশিন লার্নিংয়ে ভালো দখল রয়েছে। তিনি এআই মডেল এবং ইউজার ইন্টারফেসের মধ্যে সমন্বয় তৈরি করেন।",
    links: {
      github: "https://github.com/Priyadarshini75",
      linkedin: "https://www.linkedin.com/in/priyadarshinii/",
      email: "priyadarshinichavan75@gmail.com",
    },
  },
]

const TeamMember = ({ member, index }: { member: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-gray-900 dark:bg-black border border-gray-700 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        {index < 2 ? (
          <User className="w-24 h-24 sm:w-32 sm:h-32 text-blue-400" />
        ) : (
          <UserCircle className="w-24 h-24 sm:w-32 sm:h-32 text-purple-400" />
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 text-white">{member.name}</h3>
        <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4">{member.role}</p>
        <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-4 line-clamp-4">{member.bio}</p>
        <div className="flex space-x-3 sm:space-x-4">
          <a
            href={member.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </a>
          <a
            href={member.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </a>
          <a href={`mailto:${member.links.email}`} className="text-gray-400 hover:text-white">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function OurTeam() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-black dark:bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          আমাদের টিম
        </motion.h1>
        <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 bg-black">
          {isLoaded &&
            teamMembers.map((member, index) => <TeamMember key={member.name} member={member} index={index} />)}
        </section>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold mb-4 pt-10">আমাদের লক্ষ্য</h2>
          <p className="text-gray-400">
            গ্রামআরোগ্যে আমরা এমন একটি বিশ্বের স্বপ্ন দেখি যেখানে গুণগত মানের স্বাস্থ্যসেবা সবার কাছে পৌঁছাবে, তাদের অবস্থান বা অর্থনৈতিক অবস্থা নির্বিশেষে। আমাদের মিশন হল আধুনিক প্রযুক্তি ব্যবহার করে গ্রামীণ জনগোষ্ঠী এবং স্বাস্থ্যসেবা পেশাদারদের মধ্যে দূরত্ব কমিয়ে আনা, যাতে প্রতিটি ব্যক্তি সঠিক সময়ে কার্যকর চিকিৎসা পরামর্শ এবং সহায়তা পেতে পারে।
          </p>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}
