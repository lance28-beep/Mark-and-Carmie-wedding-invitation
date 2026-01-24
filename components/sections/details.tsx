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
  
  const ceremonyLocation = siteConfig.ceremony.location
  const receptionLocation = siteConfig.reception.location
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
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.ceremony.location)}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.reception.location)}`

  const openInMaps = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer")
  }

  return (
    <Section
      id="details"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 -z-10 bg-[#606C60]"
      />
      
      {/* Flower decoration - top left corner */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60 scale-y-[-1]"
          priority={false}
          style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(5%) saturate(500%) hue-rotate(10deg) brightness(110%) contrast(90%)' }}
        />
      </div>
      
      {/* Flower decoration - top right corner */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60 scale-x-[-1] scale-y-[-1]"
          priority={false}
          style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(5%) saturate(500%) hue-rotate(10deg) brightness(110%) contrast(90%)' }}
        />
      </div>
      
      {/* Flower decoration - left bottom corner */}
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60"
          priority={false}
          style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(5%) saturate(500%) hue-rotate(10deg) brightness(110%) contrast(90%)' }}
        />
      </div>
      
      {/* Flower decoration - right bottom corner */}
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60 scale-x-[-1]"
          priority={false}
          style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(5%) saturate(500%) hue-rotate(10deg) brightness(110%) contrast(90%)' }}
        />
      </div>

      {/* Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#E1D5C7] mb-2`}
        >
          Ceremony & Reception Details
        </p>

        <h2
          className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E1D5C7] mb-1.5 sm:mb-3 md:mb-4`}
        >
          Details
        </h2>

        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#E1D5C7] font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          All the important details to help you join us in celebrating our special day
        </p>
        <p className={`${cormorant.className} text-[0.65rem] sm:text-xs md:text-sm text-[#E1D5C7] font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          RSVP Deadline: {siteConfig.details.rsvp.deadline}
        </p>

        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#E1D5C7]/80 to-transparent" />
          <div className="w-1.5 h-1.5 bg-[#E1D5C7]/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#E1D5C7]/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-[#E1D5C7]/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#E1D5C7]/80 to-transparent" />
        </div>
      </div>

      {/* Ceremony Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5">
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-[#E1D5C7]/40 bg-[#E1D5C7] backdrop-blur-lg shadow-[0_18px_40px_rgba(225,213,199,0.15)] transition-transform duration-500 group hover:scale-[1.01]">
          {/* Ceremony image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <Image
              src="/Details/ceremony&location.jpg"
              alt={ceremonyLocationFormatted}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#606C60]/95 via-[#606C60]/65 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end px-3 sm:px-6 pb-3 sm:pb-6">
              <p className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-normal leading-none drop-shadow-md mb-2 text-[#E1D5C7]`}>
                Ceremony & Reception
              </p>
            </div>
          </div>

          {/* Combined Details panel */}
          <div className={`${cormorant.className} bg-[#E1D5C7] text-[#606C60] px-3 sm:px-6 py-4 sm:py-6 space-y-4 backdrop-blur-sm`}>
            {/* Address */}
            <div className="text-left pb-3 border-b border-[#606C60]/30">
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#606C60] uppercase mb-1">
                Location
              </p>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#606C60]">
                {ceremonyLocationFormatted}
              </p>
            </div>

            {/* Date */}
            <div className="text-left pb-3 border-b border-[#606C60]/30">
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#606C60] uppercase mb-1">
                Date
              </p>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#606C60]">
                {formattedCeremonyDate}
              </p>
            </div>

            {/* Ceremony & Reception Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-left">
              <div className="rounded-md border border-[#606C60] bg-[#E1D5C7] px-2.5 py-2 shadow-sm">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#606C60] uppercase mb-0.5">
                  Ceremony Time
                </p>
                <p className="text-sm sm:text-base font-bold text-[#606C60]">{siteConfig.ceremony.time}</p>
              </div>
              <div className="rounded-md border border-[#606C60] bg-[#E1D5C7] px-2.5 py-2 shadow-sm">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-[#606C60] uppercase mb-0.5">
                  Reception Time
                </p>
                <p className="text-sm sm:text-base font-bold text-[#606C60]">{siteConfig.reception.time}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 pt-2">
              <button
                onClick={() => openInMaps(ceremonyMapsLink)}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#606C60] text-[#E1D5C7] py-2.5 sm:py-3 shadow-lg hover:translate-y-[-2px] hover:bg-[#606C60]/90 transition-all text-xs sm:text-sm font-semibold"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
              <button
                onClick={() => copyToClipboard(ceremonyLocation, "ceremony")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-[#606C60]/35 text-[#606C60] py-2.5 sm:py-3 hover:bg-[#606C60]/5 transition-all text-xs sm:text-sm font-semibold"
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
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(96, 108, 96, 0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#E1D5C7", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "#E1D5C7", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-gradient-to-br from-[#606C60] via-[#606C60] rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "#E1D5C7", backgroundColor: "#606C60" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, #E1D5C7, #E1D5C7, #606C60)" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-[#606C60] backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "#606C60", borderColor: "#E1D5C7", color: "#E1D5C7" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-[#E1D5C7] transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "#606C60", borderColor: "#E1D5C7" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="#E1D5C7" style={{ color: "#E1D5C7" }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: "#E1D5C7" }}>
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4" style={{ color: "#E1D5C7" }} />
                    <span className="text-xs sm:text-sm font-bold" style={{ color: "#E1D5C7" }}>
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "#606C60" }}
            >
              {/* Shimmer effect */}
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

            {/* Enhanced content section */}
            <div
              className={`${cormorant.className} p-5 sm:p-6 md:p-8 bg-gradient-to-br from-[#606C60] to-[#606C60] backdrop-blur-sm border-t-2 relative`}
              style={{ borderColor: "#E1D5C7", backgroundColor: "#606C60" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#E1D5C7]/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3`}
                      style={{ color: "#E1D5C7" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6" fill="#E1D5C7" style={{ color: "#E1D5C7" }} />
                      ) : (
                        <Utensils className="w-6 h-6" style={{ color: "#E1D5C7" }} />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70" style={{ color: "#E1D5C7" }}>
                      <MapPin className="w-4 h-4" style={{ color: "#E1D5C7" }} />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#E1D5C7",
                          backgroundColor: "#606C60",
                          opacity: 0.9,
                          borderColor: "#E1D5C7",
                        }}
                      >
                        <Clock className="w-4 h-4" style={{ color: "#E1D5C7" }} />
                        <span>
                          {formattedCeremonyDate} at {siteConfig.ceremony.time}
                        </span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "#E1D5C7",
                          backgroundColor: "#606C60",
                          opacity: 0.9,
                          borderColor: "#E1D5C7",
                        }}
                      >
                        <Clock className="w-4 h-4" style={{ color: "#E1D5C7" }} />
                        <span>
                          {formattedReceptionDate} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
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
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[#606C60] border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-[#606C60] whitespace-nowrap"
                      title="Copy address"
                      style={{ borderColor: "#E1D5C7", color: "#E1D5C7" }}
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
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap text-[#606C60]"
                      style={{
                        background:
                          showImageModal === "ceremony"
                            ? "linear-gradient(to right, #E1D5C7, #E1D5C7)"
                            : "linear-gradient(to right, #E1D5C7, #E1D5C7)",
                      }}
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                <div className="flex items-center gap-2 text-xs opacity-65" style={{ color: "#E1D5C7" }}>
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


