"use client"

import { useState, useEffect } from "react"
import { Heart, RefreshCw, TrendingUp, Mail, Users, MapPin, Calendar, Crown } from "lucide-react"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import Image from "next/image"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})

interface Guest {
  id: string | number
  name: string
  role: string
  email?: string
  contact?: string
  message?: string
  allowedGuests: number
  companions: { name: string; relationship: string }[]
  tableNumber: string
  isVip: boolean
  status: 'pending' | 'confirmed' | 'declined' | 'request'
  addedBy?: string
  createdAt?: string
  updatedAt?: string
}

export function BookOfGuests() {
  const [totalGuests, setTotalGuests] = useState(0)
  const [rsvpCount, setRsvpCount] = useState(0)
  const [confirmedGuests, setConfirmedGuests] = useState<Guest[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [previousTotal, setPreviousTotal] = useState(0)
  const [showIncrease, setShowIncrease] = useState(false)
  const [showAllGuests, setShowAllGuests] = useState(false)

  // Helper function to get initials from name
  const getInitials = (name: string): string => {
    const words = name.trim().split(' ')
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  // Helper function to format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Recently'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const fetchGuests = async (showLoading = false) => {
    if (showLoading) setIsRefreshing(true)
    
    try {
      // Fetch from local API route which connects to Google Sheets
      const response = await fetch("/api/guests", {
        cache: "no-store"
      })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      // Filter only confirmed/attending guests
      const attendingGuests = data.filter((guest) => guest.status === "confirmed")
      
      // Sort guests: VIPs first, then by updatedAt (most recent first)
      const sortedGuests = attendingGuests.sort((a, b) => {
        // VIPs come first
        if (a.isVip && !b.isVip) return -1
        if (!a.isVip && b.isVip) return 1
        
        // Then sort by most recent update
        const dateA = new Date(a.updatedAt || 0).getTime()
        const dateB = new Date(b.updatedAt || 0).getTime()
        return dateB - dateA
      })
      
      // Calculate total guests by summing allowedGuests for each confirmed guest
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        return sum + (guest.allowedGuests || 1)
      }, 0)
      
      // Show increase animation if count went up
      if (totalGuestCount > totalGuests && totalGuests > 0) {
        setPreviousTotal(totalGuests)
        setShowIncrease(true)
        setTimeout(() => setShowIncrease(false), 2000)
      }
      
      setTotalGuests(totalGuestCount)
      setRsvpCount(attendingGuests.length)
      setConfirmedGuests(sortedGuests)
      setLastUpdate(new Date())
    } catch (error: any) {
      console.error("Failed to load guests:", error)
    } finally {
      if (showLoading) {
        setTimeout(() => setIsRefreshing(false), 500)
      }
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up automatic polling every 30 seconds for real-time updates
    const pollInterval = setInterval(() => {
      fetchGuests()
    }, 30000) // 30 seconds

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests(true)
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      clearInterval(pollInterval)
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [totalGuests])

  return (
    <div
      id="guests"
      className="relative z-10 pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 overflow-hidden isolate"
    >
      {/* Background with elegant gradient */}
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e8d5f2] via-[#f0e4f7] to-[#d9c8e8]"
      />
      
      {/* Decorative overlay pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235b3c8a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Flower decoration - top left corner (original colors) */}
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
      
      {/* Flower decoration - top right corner (original colors) */}
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
      
      {/* Flower decoration - left bottom corner (original colors) */}
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
      
      {/* Flower decoration - right bottom corner (original colors) */}
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

      {/* Section Header - More Compact */}
      <div className="relative z-10 text-center mb-3 sm:mb-4 md:mb-6 px-2 sm:px-3 md:px-4">
        {/* Small label */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#5b3c8a]/30 bg-white/60 backdrop-blur-sm px-3 py-1.5 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#5b3c8a] shadow-sm mb-2 sm:mb-3">
          Our Cherished Guests
        </div>

        <h2
          className={`${cinzel.className} text-xl sm:text-3xl md:text-4xl lg:text-5xl text-[#4a2c6d] mb-1 sm:mb-2 md:mb-3 drop-shadow-sm`}
        >
          Book of Guests
        </h2>

        <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#5b3c8a] font-light max-w-lg mx-auto leading-relaxed px-2`}>
          Meet the cherished souls joining us in celebration — your presence makes our day truly special
        </p>

        {/* Decorative element */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2.5 md:mt-3">
          <div className="w-6 sm:w-10 md:w-12 h-px bg-gradient-to-r from-transparent via-[#c9b2ff] to-transparent" />
          <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#5b3c8a] rounded-full" />
          <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#c9b2ff] rounded-full" />
          <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#5b3c8a] rounded-full" />
          <div className="w-6 sm:w-10 md:w-12 h-px bg-gradient-to-l from-transparent via-[#c9b2ff] to-transparent" />
        </div>
      </div>

      {/* Guests content */}
      <div className="relative">
        {/* Stats card - Simplified */}
        <div className="text-center mb-2.5 sm:mb-4 md:mb-6 px-2 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative bg-white/90 backdrop-blur-xl border border-[#c9b2ff]/50 rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6 shadow-[0_20px_60px_rgba(91,60,138,0.25)]">
              
              {/* Refresh button */}
              <button
                onClick={() => fetchGuests(true)}
                disabled={isRefreshing}
                className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] hover:from-white hover:to-white transition-all duration-300 disabled:opacity-50 group z-10 border border-[#c9b2ff]/50 shadow-sm"
                title="Refresh counts"
              >
                <RefreshCw className={`h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#5b3c8a] transition-transform ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'} duration-500`} />
              </button>

              {/* Main Count with inline text */}
              <div className="mb-1.5 sm:mb-2.5">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
                  <h3 className={`${cinzel.className} text-xl sm:text-3xl md:text-4xl font-bold text-[#4a2c6d] transition-all duration-500 ${showIncrease ? 'scale-110' : ''}`}>
                    {totalGuests}
                  </h3>
                  {showIncrease && (
                    <TrendingUp className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#5b3c8a] animate-bounce" />
                  )}
                  <p className={`${cormorant.className} text-sm sm:text-lg md:text-xl text-[#5b3c8a] font-medium leading-tight`}>
                    {totalGuests === 1 ? "Guest" : "Guests"} Celebrating With Us
                  </p>
                </div>
              </div>

              {/* RSVP Count */}
              <p className={`${cormorant.className} text-xs sm:text-base text-[#5b3c8a] mb-2 sm:mb-3`}>
                {rsvpCount} {rsvpCount === 1 ? "RSVP entry" : "RSVP entries"}
              </p>
              
              {/* Message */}
              <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#5b3c8a] leading-tight`}>
                Thank you for confirming your RSVP! Your presence means the world to us.
              </p>
            </div>
          </div>
        </div>

        {/* Guest List Display */}
        {confirmedGuests.length > 0 && (
          <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {(showAllGuests ? confirmedGuests : confirmedGuests.slice(0, 5)).map((guest) => (
                <div
                  key={guest.id}
                  className="relative group bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-2.5 sm:p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-[#c9b2ff]/50 hover:border-[#a889ff]"
                >
                  {/* Guest Header */}
                  <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-2.5 md:mb-3">
                    {/* Avatar - Mobile Optimized */}
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#B3CEAF] flex items-center justify-center shadow-md ring-2 ring-[#c9b2ff]/50 border-2 border-white">
                        <span className="text-[#4a2c6d] font-semibold text-xs sm:text-base md:text-lg">
                          {getInitials(guest.name)}
                        </span>
                      </div>
                      {/* VIP Badge - Mobile Optimized */}
                      {guest.isVip && (
                        <div className="absolute -top-0.5 -right-0.5">
                          <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#7a6ba8] to-[#5b3c8a] rounded-full shadow-md border border-white">
                            <Crown className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3.5 md:w-3.5 text-white fill-current" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Guest Info - Mobile Optimized */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 sm:mb-1.5">
                        <h3 className={`${cinzel.className} text-xs sm:text-base md:text-lg font-semibold sm:font-bold text-[#5b3c8a] leading-tight mb-0.5`}>
                          {guest.name}
                        </h3>
                        {guest.role && (
                          <p className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs text-[#5b3c8a]/80 font-medium`}>
                            {guest.role}
                          </p>
                        )}
                      </div>

                      {/* Email - Mobile Optimized */}
                      {guest.email && (
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-xs text-[#5b3c8a]/80 mb-1.5 sm:mb-2 md:mb-3">
                          <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#5b3c8a]/70 flex-shrink-0" />
                          <span className="truncate">{guest.email}</span>
                        </div>
                      )}

                      {/* Info Badges - Mobile Optimized */}
                        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 md:gap-2 mb-1.5 sm:mb-2 md:mb-3">
                        {/* Guest count badge */}
                        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-[#B3CEAF] border border-[#9ab896]/60 rounded sm:rounded-md md:rounded-lg shadow-sm">
                          <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-[#2d4a2a]" />
                          <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#2d4a2a]`}>
                            {guest.allowedGuests} {guest.allowedGuests === 1 ? 'Guest' : 'Guests'}
                          </span>
                        </div>

                        {/* Table badge */}
                        <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-[#B3CEAF] border border-[#9ab896]/60 sm:border-2 rounded sm:rounded-md md:rounded-lg shadow-sm">
                          <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-[#2d4a2a]" />
                          <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs font-semibold sm:font-bold text-[#2d4a2a]`}>
                            {guest.tableNumber && guest.tableNumber.trim() !== "" ? (
                              <>Table {guest.tableNumber}</>
                            ) : (
                              <span className="text-[#2d4a2a]/70 font-medium">Not Assigned</span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Message - Mobile Optimized */}
                      {guest.message && guest.message.trim() !== "" && (
                        <div className="relative mb-1.5 sm:mb-2.5 md:mb-3 p-2 sm:p-3 md:p-5 bg-gradient-to-br from-[#faf7ff] to-[#f5effd] rounded sm:rounded-lg md:rounded-2xl border border-[#c9b2ff]/40 shadow-sm overflow-hidden">
                          {/* Decorative corner elements - smaller on mobile */}
                          <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-[0.08]">
                            <svg viewBox="0 0 100 100" className="text-[#c9b2ff]" fill="currentColor">
                              <path d="M0,0 L100,0 L0,100 Z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 opacity-[0.08]">
                            <svg viewBox="0 0 100 100" className="text-[#c9b2ff]" fill="currentColor">
                              <path d="M100,100 L0,100 L100,0 Z" />
                            </svg>
                          </div>
                          
                          {/* Opening quote - smaller on mobile */}
                          <div className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 md:top-2 md:left-2 text-[#c9b2ff]/40">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                            </svg>
                          </div>
                          
                          {/* Closing quote - smaller on mobile */}
                          <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 md:bottom-2 md:right-2 text-[#c9b2ff]/40">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18 7h-3l-2 4v6h6v-6h-3zm-8 0H7l-2 4v6h6v-6h-3z" />
                            </svg>
                          </div>

                          {/* Message content */}
                          <div className="relative px-0.5 sm:px-1">
                            <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-base text-[#5b3c8a] leading-tight sm:leading-relaxed italic font-medium`}>
                              {guest.message}
                            </p>
                          </div>

                          {/* Elegant border accent - smaller on mobile */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 sm:w-0.5 md:w-1 h-8 sm:h-12 md:h-16 bg-gradient-to-b from-transparent via-[#c9b2ff] to-transparent rounded-r-full" />
                        </div>
                      )}

                      {/* Companions - Mobile Optimized */}
                      {guest.companions && guest.companions.length > 0 && (
                        <div className="pt-1.5 sm:pt-2 md:pt-2.5 border-t border-[#c9b2ff]/40">
                          <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
                            <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-[#5b3c8a]" />
                            <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs font-semibold text-[#5b3c8a]`}>Companions</span>
                          </div>
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {guest.companions.map((companion, idx) => (
                              <div key={idx} className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] border border-[#c9b2ff]/40 rounded sm:rounded-md md:rounded-lg hover:border-[#a889ff] transition-colors shadow-sm">
                                <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs font-medium text-[#5b3c8a] whitespace-nowrap`}>{companion.name}</span>
                                {companion.relationship && companion.relationship.trim() !== "" && (
                                  <span className={`${cormorant.className} text-[8px] sm:text-[9px] md:text-[10px] text-[#5b3c8a] bg-white/80 px-1.5 sm:px-2 py-0.5 rounded-full font-medium border border-[#c9b2ff]/40 whitespace-nowrap`}>
                                    {companion.relationship}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer - Mobile Optimized */}
                      <div className="flex items-center gap-1 pt-1.5 sm:pt-2 md:pt-2.5 mt-1.5 sm:mt-2 md:mt-2.5 border-t border-[#c9b2ff]/60">
                        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#5b3c8a]/70" />
                        <span className={`${cormorant.className} text-[8px] sm:text-[9px] md:text-[10px] text-[#5b3c8a]/80`}>
                          Confirmed {formatDate(guest.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View More Button */}
            {!showAllGuests && confirmedGuests.length > 5 && (
              <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
                <button
                  onClick={() => setShowAllGuests(true)}
                  className={`${cinzel.className} px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-[#7a6ba8] to-[#5b3c8a] backdrop-blur-md border border-[#c9b2ff]/30 rounded-lg text-white font-normal text-sm sm:text-base md:text-lg hover:from-[#6858a0] hover:to-[#4a2c78] hover:border-[#c9b2ff]/50 transition-all duration-300 shadow-[0_10px_26px_rgba(91,60,138,0.25)] hover:shadow-[0_18px_34px_rgba(91,60,138,0.32)] tracking-[0.25em] uppercase hover:-translate-y-0.5`}
                >
                  View More ({confirmedGuests.length - 5} more)
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
