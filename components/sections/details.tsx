"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import {
  Clock,
  Utensils,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Cormorant_Garamond, Cinzel } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [showImageModal, setShowImageModal] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rotationOffset, setRotationOffset] = useState(0)
  
  // Couple images from mobile-background (max 4)
  const coupleImages = [
    "/mobile-background/couple (1).webp",
    "/desktop-background/couple (2).webp",
    "/mobile-background/couple (3).webp",
    "/mobile-background/couple (4).webp",
  ]
  
  // Convert address to title case for display
  const formatAddress = (address: string) => {
    return address
      .split(',')
      .map(part => 
        part.trim()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ')
      )
      .join(', ')
  }
  
  // Explicit locations for this Details section (as provided)
  const ceremonyVenue = "Philippine Publishing House Church"
  const ceremonyLocation =
    "Aguinaldo Highway, Brgy. Biga II, Silang, Cavite 4118, Philippines"
  const receptionVenue =
    "Life Hope Center,  Southern Asia-Pacific Division (SSD)"
  const receptionLocation =
    "Aguinaldo Highway, San Miguel II Bypass, Silang, Cavite, Philippines"
  const ceremonyLocationFormatted = formatAddress(ceremonyLocation)
  const receptionLocationFormatted = formatAddress(receptionLocation)
  
  // Format date with comma: "February 8 2026" -> "February 8, 2026"
  const formattedCeremonyDate = siteConfig.ceremony.date.replace(/(\w+ \d+) (\d+)/, "$1, $2")
  
  // Format reception date: "FEB 8, 2026" -> "February 8, 2026" or keep as is if already formatted
  const receptionDate = siteConfig.reception.date
  const formattedReceptionDate = receptionDate.includes("March") || receptionDate.includes("January") || receptionDate.includes("February") || receptionDate.includes("April") || receptionDate.includes("May") || receptionDate.includes("June") || receptionDate.includes("July") || receptionDate.includes("August") || receptionDate.includes("September") || receptionDate.includes("October") || receptionDate.includes("November") || receptionDate.includes("December")
    ? receptionDate // Already formatted, use as is
    : receptionDate
      .replace(/FEB/i, "February")
      .replace(/JAN/i, "January")
      .replace(/MAR/i, "March")
      .replace(/APR/i, "April")
      .replace(/MAY/i, "May")
      .replace(/JUN/i, "June")
      .replace(/JUL/i, "July")
      .replace(/AUG/i, "August")
      .replace(/SEP/i, "September")
      .replace(/OCT/i, "October")
      .replace(/NOV/i, "November")
      .replace(/DEC/i, "December")

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showImageModal) {
        setShowImageModal(null)
      }
    }

    if (showImageModal) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [showImageModal])

  // Auto-rotate images in carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % coupleImages.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [coupleImages.length])

  // Continuous gentle rotation animation
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotationOffset((prev) => (prev + 0.5) % 360)
    }, 50) // Update rotation every 50ms for smooth animation

    return () => clearInterval(rotationInterval)
  }, [])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems((prev) => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  // Generate Google Maps links
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(ceremonyLocation)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionLocation)}`

  const openInMaps = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <Section
      id="details"
      className="relative py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background - same as gallery */}
      <div
        className="absolute inset-0 -z-10 bg-[#f4ecff]"
      />

      {/* Flower decoration - top left corner */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70 scale-y-[-1]"
          priority={false}
        />
      </div>

      {/* Flower decoration - top right corner */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70 scale-x-[-1] scale-y-[-1]"
          priority={false}
        />
      </div>

      {/* Flower decoration - left bottom corner */}
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
          priority={false}
        />
      </div>

      {/* Flower decoration - right bottom corner */}
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70 scale-x-[-1]"
          priority={false}
        />
      </div>

      {/* Header - same style as gallery */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-4">
        <div className="space-y-2 sm:space-y-3">
          <p
            className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#5b3c8a]`}
          >
            Ceremony & Reception Details
          </p>
          <h2
            className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5b3c8a]`}
          >
            Details
          </h2>
        </div>

        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#5b3c8a] font-light max-w-xl mx-auto leading-relaxed mt-3`}>
          All the important details to help you join us in celebrating our special day
        </p>
        <p className={`${cormorant.className} text-[0.65rem] sm:text-xs md:text-sm text-[#5b3c8a] font-light max-w-xl mx-auto leading-relaxed mt-1`}>
          RSVP Deadline: {siteConfig.details.rsvp.deadline}
        </p>

        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#c9b2ff] to-transparent" />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#5b3c8a]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#c9b2ff] to-transparent" />
        </div>
      </div>

      {/* Ceremony & Reception Containers - Separate */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-5 space-y-6 sm:space-y-8">
        {/* Ceremony Container - gallery style */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#c9b2ff]/60 bg-white/60 backdrop-blur-lg shadow-[0_10px_26px_rgba(91,60,138,0.24)] transition-transform duration-500 group hover:scale-[1.01] hover:shadow-[0_16px_34px_rgba(91,60,138,0.32)] hover:border-[#c9b2ff]">
          {/* Ceremony image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <Image
              src="/Details/PhilippinePublishingHouseChurch.jpg"
              alt={ceremonyLocationFormatted}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5b3c8a]/65 via-[#5b3c8a]/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end px-3 sm:px-6 pb-3 sm:pb-6">
              <p
                className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-normal leading-none drop-shadow-md mb-2 text-white`}
              >
                Ceremony
              </p>
            </div>
          </div>

          {/* Ceremony Details panel */}
          <div className={`${cormorant.className} bg-transparent text-[#5b3c8a] px-3 sm:px-6 py-4 sm:py-6 space-y-4`}>
            {/* Venue */}
            <div className="text-left pb-3 border-b border-[#c9b2ff]/40">
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#5b3c8a]/80 uppercase mb-1">
                Venue
              </p>
              <p className={`${cinzel.className} text-base sm:text-lg md:text-xl text-[#5b3c8a]`}>
                {ceremonyVenue}
              </p>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#5b3c8a]/90 break-words">
                {ceremonyLocationFormatted}
              </p>
            </div>

            {/* Ceremony Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-left">
              <div className="rounded-md border border-[#c9b2ff]/60 bg-white/60 px-2.5 py-2 shadow-sm">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#5b3c8a]/80 uppercase mb-0.5">
                  Date
                </p>
                <p className="text-sm sm:text-base font-bold text-[#5b3c8a]">{formattedCeremonyDate}</p>
              </div>
              <div className="rounded-md border border-[#c9b2ff]/60 bg-white/60 px-2.5 py-2 shadow-sm">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#5b3c8a]/80 uppercase mb-0.5">
                  Time
                </p>
                <p className="text-sm sm:text-base font-bold text-[#5b3c8a]">{siteConfig.ceremony.time}</p>
              </div>
            </div>

            {/* Action buttons - gallery green style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 pt-2">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#B3CEAF] text-[#2d3b2c] border border-[#9db89a] py-2.5 sm:py-3 shadow-[0_10px_28px_rgba(179,206,175,0.4)] hover:-translate-y-0.5 hover:bg-[#9db89a] hover:border-[#8aa886] hover:shadow-[0_18px_36px_rgba(179,206,175,0.45)] transition-all text-xs sm:text-sm font-semibold"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
              <button
                onClick={() => copyToClipboard(ceremonyLocation, "ceremony")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#c9b2ff]/60 text-[#5b3c8a] bg-white/40 py-2.5 sm:py-3 hover:bg-[#c9b2ff]/20 hover:border-[#c9b2ff] transition-all text-xs sm:text-sm font-semibold"
              >
                {copiedItems.has("ceremony") ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Address
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Reception Container - gallery style */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#c9b2ff]/60 bg-white/60 backdrop-blur-lg shadow-[0_10px_26px_rgba(91,60,138,0.24)] transition-transform duration-500 group hover:scale-[1.01] hover:shadow-[0_16px_34px_rgba(91,60,138,0.32)] hover:border-[#c9b2ff]">
          {/* Reception image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <Image
              src="/Details/Life Hope Center.jpg"
              alt={receptionLocationFormatted}
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5b3c8a]/65 via-[#5b3c8a]/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end px-3 sm:px-6 pb-3 sm:pb-6">
              <p
                className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-normal leading-none drop-shadow-md mb-2 text-white`}
              >
                Reception
              </p>
            </div>
          </div>

          {/* Reception Details panel */}
          <div className={`${cormorant.className} bg-transparent text-[#5b3c8a] px-3 sm:px-6 py-4 sm:py-6 space-y-4`}>
            {/* Venue */}
            <div className="text-left pb-3 border-b border-[#c9b2ff]/40">
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#5b3c8a]/80 uppercase mb-1">
                Venue
              </p>
              <p className={`${cinzel.className} text-base sm:text-lg md:text-xl text-[#5b3c8a]`}>
                {receptionVenue}
              </p>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#5b3c8a]/90 break-words">
                {receptionLocationFormatted}
              </p>
            </div>

            {/* Reception Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-left">
              <div className="rounded-md border border-[#c9b2ff]/60 bg-white/60 px-2.5 py-2 shadow-sm">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#5b3c8a]/80 uppercase mb-0.5">
                  Date
                </p>
                <p className="text-sm sm:text-base font-bold text-[#5b3c8a]">{formattedReceptionDate}</p>
              </div>
              <div className="rounded-md border border-[#c9b2ff]/60 bg-white/60 px-2.5 py-2 shadow-sm">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#5b3c8a]/80 uppercase mb-0.5">
                  Time
                </p>
                <p className="text-sm sm:text-base font-bold text-[#5b3c8a]">{siteConfig.reception.time}</p>
              </div>
            </div>

            {/* Action buttons - gallery green style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 pt-2">
              <button
                onClick={() => openInMaps(receptionMapsLink)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#B3CEAF] text-[#2d3b2c] border border-[#9db89a] py-2.5 sm:py-3 shadow-[0_10px_28px_rgba(179,206,175,0.4)] hover:-translate-y-0.5 hover:bg-[#9db89a] hover:border-[#8aa886] hover:shadow-[0_18px_36px_rgba(179,206,175,0.45)] transition-all text-xs sm:text-sm font-semibold"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
              <button
                onClick={() => copyToClipboard(receptionLocation, "reception")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#c9b2ff]/60 text-[#5b3c8a] bg-white/40 py-2.5 sm:py-3 hover:bg-[#c9b2ff]/20 hover:border-[#c9b2ff] transition-all text-xs sm:text-sm font-semibold"
              >
                {copiedItems.has("reception") ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Address
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Reminders Container - gallery style */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 mt-8 sm:mt-12 md:mt-16">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#c9b2ff]/60 bg-white/60 backdrop-blur-lg shadow-[0_10px_26px_rgba(91,60,138,0.24)] hover:shadow-[0_16px_34px_rgba(91,60,138,0.32)] hover:border-[#c9b2ff] transition-all duration-300">
          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
            {/* Animated couple photos carousel */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
              {coupleImages.map((image, index) => {
                const isActive = index === currentImageIndex
                const baseRotation = index === 0 ? -5 : index === 1 ? 5 : index === 2 ? -3 : 3
                const currentRotation = isActive 
                  ? baseRotation + Math.sin(rotationOffset * Math.PI / 180) * 2 
                  : baseRotation
                
                return (
                  <div
                    key={index}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-[#c9b2ff]/60 shadow-lg transition-all duration-700 ease-in-out ${
                      isActive ? 'scale-110 z-10' : 'scale-100 opacity-70'
                    }`}
                    style={{
                      transform: `rotate(${currentRotation}deg) ${isActive ? 'scale(1.1)' : 'scale(1)'}`,
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Wedding couple ${index + 1}`}
                      fill
                      className={`object-cover transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-70'
                      }`}
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    />
                  </div>
                )
              })}
            </div>

            {/* Title */}
            <h3 className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl text-center text-[#5b3c8a] mb-6 sm:mb-8 font-normal tracking-wide`}>
              GENTLE REMINDERS
            </h3>

            {/* Reminders List */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl mx-auto">
              {/* Children Reminder */}
              <div className="bg-white/60 rounded-lg p-4 sm:p-5 md:p-6 border border-[#c9b2ff]/60 shadow-sm">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-[#5b3c8a] mb-2 sm:mb-3`}>
                  CHILDREN
                </h4>
                <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-[#5b3c8a]/90 leading-relaxed`}>
                  To allow all of our guests to celebrate without distraction, we respectfully request that the wedding reception be an adults-only event. Thank you for your understanding.
                </p>
              </div>

              {/* Unplugged Ceremony Reminder */}
              <div className="bg-white/60 rounded-lg p-4 sm:p-5 md:p-6 border border-[#c9b2ff]/60 shadow-sm">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-[#5b3c8a] mb-2 sm:mb-3`}>
                  UNPLUGGED CEREMONY
                </h4>
                <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-[#5b3c8a]/90 leading-relaxed`}>
                  We are having an unplugged ceremony, meaning we kindly ask all guests to put away their phones and cameras. We want everyone to be fully in the moment with us. Don't worry—our professional photographer will capture all the special moments, and we'll be happy to share them with you later!
                </p>
              </div>

              {/* Arrival Reminder */}
              <div className="bg-white/60 rounded-lg p-4 sm:p-5 md:p-6 border border-[#c9b2ff]/60 shadow-sm">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-[#5b3c8a] mb-2 sm:mb-3`}>
                  ARRIVAL
                </h4>
                <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-[#5b3c8a]/90 leading-relaxed`}>
                  To ensure everything runs smoothly, please arrive at least 30 minutes before the ceremony starts. This will give you time to find your seat, take in the beautiful setup, and be fully present for our special moment.
                </p>
              </div>

              {/* Gifts Reminder */}
              <div className="bg-white/60 rounded-lg p-4 sm:p-5 md:p-6 border border-[#c9b2ff]/60 shadow-sm">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-[#5b3c8a] mb-2 sm:mb-3`}>
                  GIFTS
                </h4>
                <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-[#5b3c8a]/90 leading-relaxed`}>
                  Your presence is already the greatest gift, but if you'd like to give something, cash gifts are preferred. This will help us start our new journey together in the most meaningful way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal - gallery palette */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500 bg-[#5b3c8a]/95"
          onClick={() => setShowImageModal(null)}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse bg-[#c9b2ff]/20" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse bg-[#c9b2ff]/25" style={{ animationDelay: "1s" }} />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-[#5b3c8a] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c9b2ff]/60 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9b2ff] via-[#c9b2ff] to-[#5b3c8a]" />

            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 bg-[#5b3c8a]/95 hover:bg-[#4a2f76] backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 border-[#c9b2ff]/60 text-white"
              title="Close (ESC)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>

            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2 border-[#c9b2ff]/60 bg-[#5b3c8a]/95 text-white">
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="currentColor" />
                    <span className="text-xs sm:text-sm font-bold">Ceremony Venue</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-bold">Reception Venue</span>
                  </>
                )}
              </div>
            </div>

            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden bg-[#5b3c8a]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
              <Image
                src={showImageModal === "ceremony" ? "/Details/ceremony&location.jpg" : "/Details/Kayama Mountain Resort And Events Place, Sitio Kaytuyang, Brgy. Aga Nasugbu, Batangas.png"}
                alt={showImageModal === "ceremony" ? ceremonyLocationFormatted : receptionLocationFormatted}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            <div className={`${cormorant.className} p-5 sm:p-6 md:p-8 bg-[#5b3c8a] border-t-2 border-[#c9b2ff]/40 relative`}>
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c9b2ff]/50 to-transparent" />

              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3 text-white`}>
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6" fill="currentColor" />
                      ) : (
                        <Utensils className="w-6 h-6" />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>

                    {showImageModal === "ceremony" && (
                      <div className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border border-[#c9b2ff]/60 bg-[#5b3c8a]/80 text-white">
                        <Clock className="w-4 h-4" />
                        <span>{formattedCeremonyDate} at {siteConfig.ceremony.time}</span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border border-[#c9b2ff]/60 bg-[#5b3c8a]/80 text-white">
                        <Clock className="w-4 h-4" />
                        <span>{formattedReceptionDate} - {siteConfig.reception.time}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? ceremonyLocation
                            : receptionLocation,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white/10 border-2 border-[#c9b2ff]/60 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 hover:bg-white/20 hover:border-[#c9b2ff] whitespace-nowrap"
                      title="Copy address"
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap bg-[#B3CEAF] text-[#2d3b2c] border border-[#9db89a] hover:bg-[#9db89a] hover:border-[#8aa886]"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/65">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}


