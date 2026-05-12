"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Globe, MapPin, Navigation } from "lucide-react"

const GOOGLE_MAPS_API_KEY = ""

// Bilingual translations
const translations = {
  bn: {
    heading: "নিকটস্থ স্বাস্থ্যসেবা কেন্দ্রসমূহ",
    subheading: "আপনার কাছাকাছি হাসপাতাল ও ক্লিনিক খুঁজুন",
    selectType: "ধরণ নির্বাচন করুন",
    allTypes: "সব ধরণের চিকিৎসা কেন্দ্র",
    public: "সরকারি স্বাস্থ্য কেন্দ্র/হাসপাতাল",
    private: "বেসরকারি স্বাস্থ্য কেন্দ্র",
    clinic: "ডাক্তার চেম্বার/ক্লিনিক",
    medical: "অন্যান্য চিকিৎসা কেন্দ্র",
    kmAway: "কি.মি. দূরে",
    viewOnMap: "ম্যাপে দেখুন",
    locationDenied: "অবস্থান অ্যাক্সেস অস্বীকৃত",
    notSupported: "জিওলোকেশন সাপোর্টেড নয়",
    loading: "লোড হচ্ছে...",
    noResults: "কোনো ফলাফল পাওয়া যায়নি",
  },
  en: {
    heading: "Nearby Healthcare Centers",
    subheading: "Find hospitals and clinics near you",
    selectType: "Select Type",
    allTypes: "All Medical Centers",
    public: "Government Hospitals",
    private: "Private Health Centers",
    clinic: "Doctor Chambers/Clinics",
    medical: "Other Medical Centers",
    kmAway: "km away",
    viewOnMap: "View on Map",
    locationDenied: "Location access denied",
    notSupported: "Geolocation not supported",
    loading: "Loading...",
    noResults: "No results found",
  },
}

declare global {
  interface Window {
    initMap: () => void
  }
}

export default function GMap() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [places, setPlaces] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedFacility, setSelectedFacility] = useState<string>("all")
  const [isMounted, setIsMounted] = useState(false)
  const [uiLang, setUiLang] = useState<"bn" | "en">("bn")

  const t = translations[uiLang]

  useEffect(() => {
    setIsMounted(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setLocation({ lat, lng })
          fetchNearbyPlaces(lat, lng, selectedFacility)
        },
        () => setError(t.locationDenied),
        { enableHighAccuracy: true },
      )
    } else {
      setError(t.notSupported)
    }
  }, [selectedFacility])

  const fetchNearbyPlaces = async (lat: number, lng: number, facilityType: string) => {
    try {
      const response = await fetch(`/api/health-centers?lat=${lat}&lng=${lng}&type=${facilityType}`)
      const data = await response.json()

      const sortedPlaces = data.results
        .map((place: any) => ({
          ...place,
          distance: getDistance(lat, lng, place.lat, place.lng),
          mapsLink: `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`,
        }))
        .sort((a: any, b: any) => a.distance - b.distance)

      setPlaces(sortedPlaces)
    } catch (error) {
      setError("")
    }
  }

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180
    const R = 6371
    const dLat = toRad(lat2 - lat1)
    const dLng = toRad(lng2 - lng1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="pt-20 sm:pt-24 w-full" />

      {/* Language Toggle */}
      <div className="absolute top-20 sm:top-24 right-4 sm:right-6 z-10">
        <button
          onClick={() => setUiLang(uiLang === "bn" ? "en" : "bn")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/80 border border-gray-700 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <Globe size={14} />
          {uiLang === "bn" ? "EN" : "বাং"}
        </button>
      </div>

      {/* Page Header */}
      <div className="text-center mb-6 sm:mb-8 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {t.heading}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">{t.subheading}</p>
      </div>

      {error && (
        <p className="text-red-400 mb-4 text-sm font-medium bg-red-900/20 border border-red-700/50 px-4 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Filter Dropdown */}
      <div className="mb-6 sm:mb-8 w-full max-w-md px-4">
        <label htmlFor="facility-type" className="block text-sm font-medium text-gray-400 mb-2 text-center">
          {t.selectType}
        </label>
        <select
          id="facility-type"
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-xl bg-gray-800/80 text-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "20px",
          }}
        >
          <option value="all" className="bg-gray-900">{t.allTypes}</option>
          <option value="public" className="bg-gray-900">{t.public}</option>
          <option value="private" className="bg-gray-900">{t.private}</option>
          <option value="clinic" className="bg-gray-900">{t.clinic}</option>
          <option value="medical" className="bg-gray-900">{t.medical}</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl px-4 gap-6 pb-8">
        {/* Map Section */}
        {isMounted && location ? (
          <div className="w-full lg:w-[60%] h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-700/50">
            <iframe
              width="100%"
              height="100%"
              className="rounded-2xl"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_API_KEY}&q=hospital+OR+clinic+OR+doctor+OR+medical+center${selectedFacility !== "all" ? `+${selectedFacility}` : ""}&center=${location.lat},${location.lng}&zoom=14`}
            />
          </div>
        ) : (
          <div className="w-full lg:w-[60%] h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
            <div className="text-center">
              <Navigation size={48} className="text-purple-400 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-400">{t.loading}</p>
            </div>
          </div>
        )}

        {/* Places List */}
        <div className="w-full lg:w-[40%] h-[350px] sm:h-[400px] lg:h-[500px] overflow-y-auto rounded-2xl bg-gray-800/30 border border-gray-700/50 p-4">
          {places.length > 0 ? (
            <ul className="space-y-3">
              {places.map((place, index) => (
                <li
                  key={index}
                  className="border border-gray-700/50 p-4 rounded-xl bg-gray-800/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-purple-500/30 transition-all group"
                >
                  <div className="flex flex-col gap-2">
                    <strong className="text-base sm:text-lg font-semibold text-purple-400 group-hover:text-purple-300 transition-colors line-clamp-1">
                      {place.name}
                    </strong>
                    <p className="text-sm text-gray-400 line-clamp-1 flex items-center gap-1">
                      <MapPin size={14} className="text-pink-400 flex-shrink-0" />
                      {place.vicinity}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-medium bg-purple-900/50 text-purple-200 px-2.5 py-1 rounded-full">
                        {place.distance.toFixed(2)} {t.kmAway}
                      </span>
                      <a
                        href={place.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 font-medium text-xs transition-colors"
                      >
                        {t.viewOnMap} →
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <MapPin size={40} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">{t.noResults}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
