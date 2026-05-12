"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const GOOGLE_MAPS_API_KEY = ""

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
        () => setError("Location access denied"),
        { enableHighAccuracy: true },
      )
    } else {
      setError("Geolocation is not supported")
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
        .sort((a, b) => a.distance - b.distance)

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
    <div className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-6 bg-background text-foreground min-h-screen">
      <Navbar />

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 pt-24 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        নিকটস্থ স্বাস্থ্যসেবা কেন্দ্রসমূহ
      </h1>

      {error && <p className="text-destructive mb-4 text-sm font-medium bg-destructive/10 px-4 py-2 rounded-lg">{error}</p>}

      <div className="mb-8 w-full max-w-md">
        <label htmlFor="facility-type" className="block text-sm font-medium text-muted-foreground mb-2 text-center">
          ধরণ নির্বাচন করুন
        </label>
        <select
          id="facility-type"
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          className="w-full p-2.5 border border-purple-100 dark:border-purple-900/30 rounded-xl bg-card text-foreground shadow-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
        >
          <option value="all">সব ধরণের চিকিৎসা কেন্দ্র</option>
          <option value="public">সরকারি স্বাস্থ্য কেন্দ্র/হাসপাতাল</option>
          <option value="private">বেসরকারি স্বাস্থ্য কেন্দ্র</option>
          <option value="clinic">ডাক্তার চেম্বার/ক্লিনিক</option>
          <option value="medical">অন্যান্য চিকিৎসা কেন্দ্র</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl mt-4 gap-6">
        {/* Map Section (Left) */}
        {isMounted && location && (
          <div className="w-full lg:w-[60%] h-[350px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-purple-100 dark:border-purple-900/30">
            <iframe
              width="100%"
              height="100%"
              className="rounded-2xl"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_API_KEY}&q=hospital+OR+clinic+OR+doctor+OR+medical+center${selectedFacility !== "all" ? `+${selectedFacility}` : ""}&center=${location.lat},${location.lng}&zoom=14`}
            ></iframe>
          </div>
        )}

        {/* Places List (Right) */}
        <div className="w-full lg:w-[40%] h-[400px] lg:h-[500px] overflow-y-auto custom-scrollbar pr-2">
          <ul className="space-y-4">
            {places.map((place, index) => (
              <li
                key={index}
                className="border border-purple-100 dark:border-purple-900/20 p-4 rounded-xl bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
              >
                <div className="flex flex-col gap-1">
                  <strong className="text-lg font-bold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 transition-colors">
                    {place.name}
                  </strong>
                  <p className="text-sm text-muted-foreground italic line-clamp-1">{place.vicinity}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-600 px-2 py-1 rounded-md">
                      {place.distance.toFixed(2)} কি.মি. দূরে
                    </span>
                    <a
                      href={place.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-purple-400 hover:underline font-bold text-xs"
                    >
                      ম্যাপে দেখুন
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f1f1f;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  )
}

