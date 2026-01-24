"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Heart, Music2 } from "lucide-react"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond, Cinzel } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})

// Helper function to convert text to title case (first letter of each word uppercase)
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function Footer() {
  const year = new Date().getFullYear()
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTime = siteConfig.ceremony.time
  const receptionTime = siteConfig.reception.time
  const ceremonyVenue = siteConfig.ceremony.venue
  const receptionVenue = siteConfig.reception.venue

  // Format date with comma: "February 8 2026" -> "February 8, 2026"
  const formattedDate = ceremonyDate.replace(/(\w+ \d+) (\d+)/, "$1, $2")

  const [ceremonyMonth = "December", ceremonyDayRaw = "21", ceremonyYear = "2025"] = ceremonyDate.split(" ")
  const ceremonyDayNumber = ceremonyDayRaw.replace(/[^0-9]/g, "") || "21"

  const quotes = [
    `"I have found the one whom my soul loves." – Song of Solomon 3:4`,
    "Welcome to our wedding website! We've found a love that's a true blessing, and we give thanks to God for writing the beautiful story of our journey together.",
    "Thank you for your love, prayers, and support. We can't wait to celebrate this joyful day together!",
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      } else {
        setIsDeleting(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      } else {
        setIsPaused(true)
        setIsDeleting(true)
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Events", href: "#details" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#guest-list" },
  ] as const

  return (
    <footer 
      className="relative z-20 mt-12 sm:mt-16 overflow-hidden"
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
          style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(8%) saturate(800%) hue-rotate(10deg) brightness(105%) contrast(90%)' }}
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
          style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(8%) saturate(800%) hue-rotate(10deg) brightness(105%) contrast(90%)' }}
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
          style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(8%) saturate(800%) hue-rotate(10deg) brightness(105%) contrast(90%)' }}
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
          style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(8%) saturate(800%) hue-rotate(10deg) brightness(105%) contrast(90%)' }}
        />
      </div>
      
      {/* Monogram / Couple Illustration - centered at top */}
      <div className="relative z-10 flex flex-col items-center pt-6 sm:pt-8 md:pt-10 mb-5 sm:mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 opacity-95">
            <Image
              src="/monogram/monogram.png"
              alt={`${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname} monogram`}
              fill
              className="object-contain"
              priority={false}
              style={{
                filter: "brightness(0) saturate(100%) invert(88%) sepia(8%) saturate(800%) hue-rotate(10deg) brightness(105%) contrast(90%)",
              }}
            />
          </div>
        </motion.div>

        {/* Names & Date below illustration */}
        <div className="mt-3 sm:mt-4 md:mt-5 text-center">
          <p
            className={`${cormorant.className} tracking-[0.25em] sm:tracking-[0.3em] text-xs sm:text-sm md:text-base text-[#E1D5C7] uppercase`}
          >
            {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
          </p>
          <p
            className={`${cormorant.className} text-sm sm:text-base md:text-lg text-[#E1D5C7] mt-1 sm:mt-2`}
          >
            {ceremonyDate}
          </p>
          <p
            className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#E1D5C7] mt-1 sm:mt-2`}
          >
            {siteConfig.ceremony.venue}
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pb-6 sm:pb-8 md:pb-10">
        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10" variants={staggerChildren} initial="initial" animate="animate">
          {/* Couple Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-5 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-[#E1D5C7]/95 rounded-full flex items-center justify-center border border-[#606C60]/40 flex-shrink-0 shadow-md">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-[#606C60]" fill="#606C60" />
                </div>
                <h3 className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-[#E1D5C7]`}>{siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}</h3>
              </div>
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                <div className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 ${cormorant.className} text-[#E1D5C7]`}>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#E1D5C7] flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg font-medium">{ceremonyDate}</span>
                </div>
                <div className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 ${cormorant.className} text-[#E1D5C7]`}>
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-[#E1D5C7] flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base leading-relaxed">{toTitleCase(ceremonyVenue)}</span>
                </div>
              </div>
            </div>

            <motion.div className="bg-[#E1D5C7]/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#606C60]/40 shadow-[0_18px_45px_rgba(96,108,96,0.15)]" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className={`${cormorant.className} text-[#606C60] italic text-sm sm:text-base md:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px]`}>
                "{displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-[#606C60] ml-1 animate-pulse">|</span>"
              </blockquote>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#606C60] rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#606C60]/60 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#606C60] rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-3 sm:space-y-4 md:space-y-5" variants={fadeInUp}>
            <motion.div className="bg-[#E1D5C7]/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-[#606C60]/40 hover:bg-[#E1D5C7] transition-all duration-300 shadow-[0_14px_40px_rgba(96,108,96,0.15)]" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-2.5 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border border-[#606C60]/40 flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#606C60]" />
                </div>
                <h4 className={`${cinzel.className} font-semibold text-base sm:text-lg md:text-xl text-[#606C60]`}>Ceremony</h4>
              </div>
              <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${cormorant.className} text-[#606C60] text-xs sm:text-sm leading-relaxed`}>
                <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#606C60] flex-shrink-0 mt-0.5" />
                  <span>{toTitleCase(ceremonyVenue)}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#606C60] flex-shrink-0" />
                  <span>{ceremonyTime}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-[#E1D5C7]/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-[#606C60]/40 hover:bg-[#E1D5C7] transition-all duration-300 shadow-[0_14px_40px_rgba(96,108,96,0.15)]" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-2.5 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border border-[#606C60]/40 flex-shrink-0">
                  <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#606C60]" fill="#606C60" />
                </div>
                <h4 className={`${cinzel.className} font-semibold text-base sm:text-lg md:text-xl text-[#606C60]`}>Reception</h4>
              </div>
              <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${cormorant.className} text-[#606C60] text-xs sm:text-sm leading-relaxed`}>
                <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#606C60] flex-shrink-0 mt-0.5" />
                  <span>{toTitleCase(receptionVenue)}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#606C60] flex-shrink-0" />
                  <span>{receptionTime}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-5 sm:space-y-6 md:space-y-7" variants={fadeInUp}>
            <div>
              <h4 className={`${cinzel.className} font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-5 flex items-center gap-2 sm:gap-2.5 md:gap-3 text-[#E1D5C7]`}>
                <div className="w-1.5 sm:w-2 h-6 sm:h-7 md:h-8 bg-[#E1D5C7] rounded-full" /> Follow Us
              </h4>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#E1D5C7]/95 ring-1 ring-[#606C60]/40 hover:bg-[#E1D5C7] hover:ring-[#606C60] transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-[#606C60]" />
                </a>
                <a 
                  href="https://www.instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#E1D5C7]/95 ring-1 ring-[#606C60]/40 hover:bg-[#E1D5C7] hover:ring-[#606C60] transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#606C60]" />
                </a>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#E1D5C7]/95 ring-1 ring-[#606C60]/40 hover:bg-[#E1D5C7] hover:ring-[#606C60] transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                >
                  <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#606C60]" />
                </a>
                <a 
                  href="https://x.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#E1D5C7]/95 ring-1 ring-[#606C60]/40 hover:bg-[#E1D5C7] hover:ring-[#606C60] transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-[#606C60]" />
                </a>
              </div>
            </div>

            <div>
              <h5 className={`${cinzel.className} font-semibold text-sm sm:text-base md:text-lg mb-2.5 sm:mb-3 md:mb-4 text-[#E1D5C7]`}>Quick Links</h5>
              <div className="space-y-1.5 sm:space-y-2">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`block text-[#E1D5C7] hover:text-[#E1D5C7]/80 transition-colors duration-200 ${cormorant.className} text-xs sm:text-sm leading-relaxed`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div className="border-t border-[#606C60]/40 pt-5 sm:pt-6 md:pt-7" variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-5">
            <div className="text-center md:text-left">
              <p className={`text-[#E1D5C7] ${cormorant.className} text-xs sm:text-sm leading-relaxed`}>
                © {year} {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname} — crafted with love, prayers, and gratitude.
              </p>
              <p className={`text-[#E1D5C7]/85 ${cormorant.className} text-xs sm:text-sm mt-1 leading-relaxed`}>
                This celebration site was designed to share our story and joy with you.
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-1">
              <p className={`text-[#E1D5C7]/85 ${cormorant.className} text-xs sm:text-sm`}>
                Developed by{" "}
                <a 
                  href="https://lance28-beep.github.io/portfolio-website/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#E1D5C7] hover:text-[#E1D5C7]/80 transition-colors duration-200 underline decoration-[#E1D5C7]/60 hover:decoration-[#E1D5C7]/80"
                >
                  Lance Valle
                </a>
              </p>
              <p className={`text-[#E1D5C7]/85 ${cormorant.className} text-xs sm:text-sm`}>
                Want a website like this? Visit{" "}
                <a 
                  href="https://www.facebook.com/WeddingInvitationNaga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#E1D5C7] hover:text-[#E1D5C7]/80 transition-colors duration-200 underline decoration-[#E1D5C7]/60 hover:decoration-[#E1D5C7]/80"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
