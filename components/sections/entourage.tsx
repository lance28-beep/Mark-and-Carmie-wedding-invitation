"use client"

import React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import { siteConfig } from "@/content/site"
import { Loader2, Users } from "lucide-react"
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

interface EntourageMember {
  Name: string
  RoleCategory: string
  RoleTitle: string
  Email: string
}

interface PrincipalSponsor {
  MalePrincipalSponsor: string
  FemalePrincipalSponsor: string
}

const ROLE_CATEGORY_ORDER = [
  "OFFICIATING MINISTER",
  "The Couple",
  "Parents of the Groom",
  "Parents of the Bride",
  "Family of the Groom",
  "Family of the Bride",
  "Best Man",
  "Maid of Honor",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Groomsmen",
  "Bridesmaids",
  "Little Groom",
  "Little Bride",
  "Ring Bearer",
  "Bible Bearer",
  "Coin Bearer",
  "Flower Girls",
]

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([])
  const [sponsors, setSponsors] = useState<PrincipalSponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const fetchEntourage = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch entourage")
      }
      const data: EntourageMember[] = await response.json()
      setEntourage(data)
    } catch (error: any) {
      console.error("Failed to load entourage:", error)
      setError(error?.message || "Failed to load entourage")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSponsors = async () => {
    try {
      const res = await fetch("/api/principal-sponsor", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load principal sponsors")
      const data: PrincipalSponsor[] = await res.json()
      setSponsors(data.filter(s => s.MalePrincipalSponsor || s.FemalePrincipalSponsor))
    } catch (e: any) {
      console.error("Failed to load sponsors:", e)
      // Don't set error state for sponsors, just log it
    }
  }

  useEffect(() => {
    fetchEntourage()
    fetchSponsors()

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage()
        fetchSponsors()
      }, 1000)
    }

    window.addEventListener("entourageUpdated", handleEntourageUpdate)

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate)
    }
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Group entourage by role category
  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {}
    
    entourage.forEach((member) => {
      const category = member.RoleCategory

      // Skip members without a category or in "Other"
      if (!category || category === "Other") {
        return
      }
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push(member)
    })
    
    return grouped
  }, [entourage])

  // Helper component for elegant section titles
  const SectionTitle = ({ 
    children,
    align = "center",
    className = ""
  }: { 
    children: React.ReactNode
    align?: "left" | "center" | "right"
    className?: string
  }) => {
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
       <h3
         className={`relative ${cinzel.className} text-xs sm:text-sm md:text-sm lg:text-base font-extrabold uppercase text-[#5b3c8a] mb-1 sm:mb-1.5 md:mb-2 tracking-[0.14em] sm:tracking-[0.18em] ${textAlign} ${className} transition-all duration-300 whitespace-nowrap`}
       >
        {children}
      </h3>
    )
  }

  // Helper component for name items with role title (supports alignment)
  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember
    align?: "left" | "center" | "right"
    showRole?: boolean
  }) => {
    const containerAlign =
      align === "right" ? "items-end" : align === "left" ? "items-start" : "items-center"
    const textAlign =
      align === "right" ? "text-right" : align === "left" ? "text-left" : "text-center"
    return (
      <div
        className={`relative flex flex-col ${containerAlign} justify-center py-0.5 sm:py-1 md:py-1 leading-snug sm:leading-snug group/item transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03]`}
      >
        {/* Hover highlight effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9b2ff]/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-md" />

        <p
          className={`relative text-[#5b3c8a] text-[11px] sm:text-[13px] md:text-sm lg:text-base font-semibold ${textAlign} group-hover/item:text-[#4a2f76] transition-all duration-300`}
        >
          {member.Name}
        </p>
        {showRole && member.RoleTitle && (
          <p
            className={`relative text-[#5b3c8a]/80 text-[9px] sm:text-[10px] md:text-[10px] lg:text-xs font-medium mt-0 leading-tight ${textAlign} tracking-wide uppercase group-hover/item:text-[#4a2f76] transition-colors duration-300`}
          >
            {member.RoleTitle}
          </p>
        )}
      </div>
    )
  }

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({ 
    children, 
    leftTitle, 
    rightTitle,
    singleTitle,
    centerContent = false 
  }: { 
    children: React.ReactNode
    leftTitle?: string
    rightTitle?: string
    singleTitle?: string
    centerContent?: boolean
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-2 sm:mb-2.5 md:mb-3">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-0.5 sm:gap-y-1 md:gap-y-1 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
            {children}
          </div>
        </div>
      )
    }

    return (
      <div className="mb-2 sm:mb-2.5 md:mb-3">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-16 mb-2 sm:mb-2.5 md:mb-3">
          {leftTitle && (
            <SectionTitle align="right" className="pr-2 sm:pr-3 md:pr-4">{leftTitle}</SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-2 sm:pl-3 md:pl-4">{rightTitle}</SectionTitle>
          )}
        </div>
        <div className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-0.5 sm:gap-y-1 md:gap-y-1 ${centerContent ? 'max-w-2xl mx-auto' : ''}`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="entourage"
      className="relative pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-10 lg:pb-12 overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 -z-10 bg-[#f4ecff]"
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

      {/* Section Header */}
      <div className={`relative z-30 text-center mb-4 sm:mb-5 md:mb-6 px-3 sm:px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-[#5b3c8a] mb-2`}
        >
          Those who stand with {siteConfig.couple.groomNickname} &amp; {siteConfig.couple.brideNickname}
        </p>

        <h2
          className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5b3c8a] mb-1 sm:mb-2 md:mb-2.5`}
        >
          Wedding Entourage
        </h2>

        {/* Sublabel */}
        <p
          className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#5b3c8a] mb-2 sm:mb-2.5 md:mb-3 italic`}
        >
          Honoring those who share in our joy
        </p>
      </div>

      {/* Central Card Container */}
      <div
        className={`relative z-30 max-w-4xl mx-auto px-3 sm:px-5 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Card with new theme */}
        <div className="relative bg-white/80 backdrop-blur-2xl rounded-xl sm:rounded-2xl overflow-hidden border border-[#c9b2ff]/70 shadow-[0_18px_48px_rgba(91,60,138,0.25)] transition-all duration-500 group">
          {/* Card content */}
          <div className="relative p-3 sm:p-4 md:p-5 z-10">
            {isLoading ? (
              <div className="flex items-center justify-center py-24 sm:py-28 md:py-32">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-white/70" />
                  <span className="text-white/80 font-serif text-base sm:text-lg">Loading entourage...</span>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-24 sm:py-28 md:py-32">
                <div className="text-center">
                  <p className="text-white font-serif text-base sm:text-lg mb-3">{error}</p>
                  <button
                    onClick={fetchEntourage}
                    className="text-white/90 hover:text-white font-serif underline transition-colors duration-200"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : entourage.length === 0 ? (
              <div className="text-center py-24 sm:py-28 md:py-32">
                <Users className="h-14 w-14 sm:h-16 sm:w-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 font-serif text-base sm:text-lg">No entourage members yet</p>
              </div>
            ) : (
            <>
              {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                const members = grouped[category] || []
                const isGroomsmenOrBridesmaids = category === "Groomsmen" || category === "Bridesmaids"
                const otherCount = category === "Groomsmen" ? (grouped["Bridesmaids"] || []).length : (grouped["Groomsmen"] || []).length
                const isBestManOrMaid = category === "Best Man" || category === "Maid of Honor"
                const otherHonorCount = category === "Best Man"
                  ? [...(grouped["Maid of Honor"] || []), ...(grouped["Matron of Honor"] || [])].length
                  : (grouped["Best Man"] || []).length
                const skipEmpty = members.length === 0 &&
                  (!isGroomsmenOrBridesmaids || otherCount === 0) &&
                  (!isBestManOrMaid || otherHonorCount === 0)
                if (skipEmpty) return null

                // Special handling for The Couple - display Bride and Groom side by side
                if (category === "The Couple") {
                   const groom = members.find(m => m.RoleTitle?.toLowerCase().includes('groom'))
                  const bride = members.find(m => m.RoleTitle?.toLowerCase().includes('bride'))
                  
                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-2 sm:mb-2.5 md:mb-3">
                          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        </div>
                      )}
                      <TwoColumnLayout singleTitle="The Couple" centerContent={true}>
                        <div className="px-1.5 sm:px-2 md:px-2.5">
                          {groom && <NameItem member={groom} align="right" />}
                        </div>
                        <div className="px-1.5 sm:px-2 md:px-2.5">
                          {bride && <NameItem member={bride} align="left" />}
                        </div>
                      </TwoColumnLayout>
                    </div>
                  )
                }

                // Special handling for Parents sections - combine into single two-column layout
                if (category === "Parents of the Bride" || category === "Parents of the Groom") {
                  // Get both parent groups
                  const parentsBride = grouped["Parents of the Bride"] || []
                  const parentsGroom = grouped["Parents of the Groom"] || []
                  
                  // Helper function to sort parents: father first, then mother
                  const sortParents = (members: EntourageMember[]) => {
                    return [...members].sort((a, b) => {
                      const aIsFather = a.RoleTitle?.toLowerCase().includes('father') ?? false
                      const bIsFather = b.RoleTitle?.toLowerCase().includes('father') ?? false
                      
                      // Father comes first
                      if (aIsFather && !bIsFather) return -1
                      if (!aIsFather && bIsFather) return 1
                      return 0
                    })
                  }
                  
                  // Only render once (when processing "Parents of the Groom")
                  if (category === "Parents of the Groom") {
                    return (
                      <div key="Parents">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-2 sm:mb-2.5 md:mb-3">
                            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Groom’s Parents" rightTitle="Bride’s Parents">
                          {(() => {
                            const leftArr = sortParents(parentsGroom)
                            const rightArr = sortParents(parentsBride)
                            const maxLen = Math.max(leftArr.length, rightArr.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = leftArr[i]
                              const right = rightArr[i]
                              rows.push(
                                <React.Fragment key={`parents-row-${i}`}>
                                  <div key={`parent-groom-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5" />}
                                  </div>
                                  <div key={`parent-bride-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                        
                        {/* Principal Sponsors section - displayed after Parents */}
                        {sponsors.length > 0 && (
                          <div key="SponsorsAfterParents">
                            <div className="flex justify-center py-1.5 sm:py-2 md:py-2.5 mb-2 sm:mb-2.5 md:mb-3">
                            </div>
                            <TwoColumnLayout singleTitle="Principal Sponsors" centerContent={true}>
                              {sponsors.map((sponsor, idx) => (
                                <React.Fragment key={`sponsor-row-${idx}`}>
                                  <div key={`sponsor-male-${idx}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {sponsor.MalePrincipalSponsor ? (
                                      <NameItem 
                                        member={{
                                          Name: sponsor.MalePrincipalSponsor,
                                          RoleCategory: "",
                                          RoleTitle: "",
                                          Email: ""
                                        }} 
                                        align="right" 
                                        showRole={false}
                                      />
                                    ) : (
                                      <div className="py-0.5 sm:py-1 md:py-1.5" />
                                    )}
                                  </div>
                                  <div key={`sponsor-female-${idx}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {sponsor.FemalePrincipalSponsor ? (
                                      <NameItem 
                                        member={{
                                          Name: sponsor.FemalePrincipalSponsor,
                                          RoleCategory: "",
                                          RoleTitle: "",
                                          Email: ""
                                        }} 
                                        align="left" 
                                        showRole={false}
                                      />
                                    ) : (
                                      <div className="py-0.5 sm:py-1 md:py-1.5" />
                                    )}
                                  </div>
                                </React.Fragment>
                              ))}
                            </TwoColumnLayout>
                          </div>
                        )}
                      </div>
                    )
                  }
                  // Skip rendering for "Parents of the Bride" since it's already rendered above
                  return null
                }

                // Special handling for Family of the Groom/Bride - combine into single two-column layout
                if (category === "Family of the Groom" || category === "Family of the Bride") {
                  const familyGroom = grouped["Family of the Groom"] || []
                  const familyBride = grouped["Family of the Bride"] || []

                  if (category === "Family of the Groom") {
                    return (
                      <div key="Family">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-2 sm:mb-2.5 md:mb-3">
                            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Family of the Groom" rightTitle="Family of the Bride">
                          {(() => {
                            const maxLen = Math.max(familyGroom.length, familyBride.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = familyGroom[i]
                              const right = familyBride[i]
                              rows.push(
                                <React.Fragment key={`family-row-${i}`}>
                                  <div key={`family-groom-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5" />}
                                  </div>
                                  <div key={`family-bride-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }

                  return null
                }

                // Special handling for Maid of Honor and Best Man - combine into single two-column layout (Best Man left, Maid of Honor right)
                if (category === "Maid of Honor" || category === "Best Man") {
                  // Get both honor attendant groups - include legacy "Matron of Honor" under Maid of Honor
                  const maidOfHonor = [...(grouped["Maid of Honor"] || []), ...(grouped["Matron of Honor"] || [])]
                  const bestMan = grouped["Best Man"] || []
                  const hasAnyHonor = bestMan.length > 0 || maidOfHonor.length > 0
                  
                  // Only render once (when processing "Best Man") and only if at least one has members
                  if (category === "Best Man" && hasAnyHonor) {
                    return (
                      <div key="HonorAttendants">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-2 sm:mb-2.5 md:mb-3">
                            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Best Man" rightTitle="Maid of Honor">
                          {(() => {
                            const maxLen = Math.max(bestMan.length, maidOfHonor.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = bestMan[i]
                              const right = maidOfHonor[i]
                              rows.push(
                                <React.Fragment key={`honor-row-${i}`}>
                                  <div key={`bestman-cell-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5" />}
                                  </div>
                                  <div key={`maid-cell-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Maid of Honor" since it's already rendered above with Best Man
                  return null
                }

                // Special handling for Little Groom and Little Bride - combine into single two-column layout
                if (category === "Little Groom" || category === "Little Bride") {
                  // Get both little ones groups
                  const littleGroom = grouped["Little Groom"] || []
                  const littleBride = grouped["Little Bride"] || []
                  
                  // Only render once (when processing "Little Groom")
                  if (category === "Little Groom") {
                    return (
                      <div key="LittleOnes">
                        {categoryIndex > 0 && (
                          <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-2 sm:mb-2.5 md:mb-3">
                            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                          </div>
                        )}
                        <TwoColumnLayout leftTitle="Little Groom" rightTitle="Little Bride">
                          {(() => {
                            const maxLen = Math.max(littleGroom.length, littleBride.length)
                            const rows = []
                            for (let i = 0; i < maxLen; i++) {
                              const left = littleGroom[i]
                              const right = littleBride[i]
                              rows.push(
                                <React.Fragment key={`little-row-${i}`}>
                                  <div key={`littlegroom-cell-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {left ? <NameItem member={left} align="right" /> : <div className="py-0.5" />}
                                  </div>
                                  <div key={`littlebride-cell-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                    {right ? <NameItem member={right} align="left" /> : <div className="py-0.5" />}
                                  </div>
                                </React.Fragment>
                              )
                            }
                            return rows
                          })()}
                        </TwoColumnLayout>
                      </div>
                    )
                  }
                  // Skip rendering for "Little Bride" since it's already rendered above
                  return null
                }

                // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                if (category === "Bridesmaids" || category === "Groomsmen") {
                  // Get both bridal party groups
                  const bridesmaids = grouped["Bridesmaids"] || []
                  const groomsmen = grouped["Groomsmen"] || []
                  const hasAny = groomsmen.length > 0 || bridesmaids.length > 0

                  // Only render once when processing "Groomsmen" (comes first in ROLE_CATEGORY_ORDER).
                  // This ensures the section shows when only Groomsmen exist (no Bridesmaids in data).
                  if (category === "Groomsmen" && hasAny) {
                    return (
                      <React.Fragment key="BridalPartySection">
                        {/* Groomsmen/Bridesmaids section */}
                        <div key="BridalParty">
                          {categoryIndex > 0 && (
                            <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-2 sm:mb-2.5 md:mb-3">
                              <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                            </div>
                          )}
                          <TwoColumnLayout leftTitle="Groomsmen" rightTitle="Bridesmaids">
                            {(() => {
                              const maxLen = Math.max(bridesmaids.length, groomsmen.length)
                              const rows = []
                              for (let i = 0; i < maxLen; i++) {
                                const groomsman = groomsmen[i]
                                const bridesmaid = bridesmaids[i]
                                rows.push(
                                  <React.Fragment key={`bridal-row-${i}`}>
                                    <div key={`groomsman-cell-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                      {groomsman ? <NameItem member={groomsman} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                    </div>
                                    <div key={`bridesmaid-cell-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                      {bridesmaid ? <NameItem member={bridesmaid} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                    </div>
                                  </React.Fragment>
                                )
                              }
                              return rows
                            })()}
                          </TwoColumnLayout>
                        </div>
                      </React.Fragment>
                    )
                  }
                  // Skip "Groomsmen" when no members in either (already returned null above), skip "Bridesmaids" since rendered with Groomsmen
                  return null
                }

                // Special handling: Add "Secondary Sponsors" label above Candle Sponsors
                if (category === "Candle Sponsors") {
                  return (
                    <div key={category}>
                      {categoryIndex > 0 && (
                        <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-2 sm:mb-2.5 md:mb-3">
                          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        </div>
                      )}
                      {/* Secondary Sponsors label */}
                      <div className="mb-1.5 sm:mb-2 md:mb-2.5">
                        <SectionTitle>Secondary Sponsors</SectionTitle>
                      </div>
                      <TwoColumnLayout singleTitle={category} centerContent={true}>
                        {(() => {
                          const PAIRED_SECTIONS = new Set(["Candle Sponsors", "Cord Sponsors", "Veil Sponsors"])
                          if (PAIRED_SECTIONS.has(category) && members.length === 2) {
                            const left = members[0]
                            const right = members[1]
                            return (
                              <>
                                <div className="px-1.5 sm:px-2 md:px-2.5">
                                  <NameItem member={left} align="right" />
                                </div>
                                <div className="px-1.5 sm:px-2 md:px-2.5">
                                  <NameItem member={right} align="left" />
                                </div>
                              </>
                            )
                          }
                          if (members.length <= 2) {
                            return (
                              <div className="col-span-full">
                                <div className="max-w-sm mx-auto flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1">
                                  {members.map((member, idx) => (
                                    <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                  ))}
                                </div>
                              </div>
                            )
                          }
                          // Default two-column sections: render row-by-row pairs
                          const half = Math.ceil(members.length / 2)
                          const left = members.slice(0, half)
                          const right = members.slice(half)
                          const maxLen = Math.max(left.length, right.length)
                          const rows = []
                          for (let i = 0; i < maxLen; i++) {
                            const l = left[i]
                            const r = right[i]
                            rows.push(
                              <React.Fragment key={`${category}-row-${i}`}>
                                <div key={`${category}-cell-left-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                  {l ? <NameItem member={l} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                </div>
                                <div key={`${category}-cell-right-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                  {r ? <NameItem member={r} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                                </div>
                              </React.Fragment>
                            )
                          }
                          return rows
                        })()}
                      </TwoColumnLayout>
                    </div>
                  )
                }

                // Default: single title, centered content
                return (
                  <div key={category}>
                    {categoryIndex > 0 && (
                      <div className="flex justify-center py-2 sm:py-2.5 md:py-3 mb-2 sm:mb-2.5 md:mb-3">
                        <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#606C60]/30 to-transparent"></div>
                      </div>
                    )}
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        const SINGLE_COLUMN_SECTIONS = new Set([
                          "Best Man",
                          "Maid of Honor",
                          "Ring Bearer",
                          "Coin Bearer",
                          "Bible Bearer",
                          "Flower Girls",
                          "Presider",
                        ])
                        // Special rule: paired sponsor roles with exactly 2 names should meet at center
                        const PAIRED_SECTIONS = new Set(["Candle Sponsors", "Cord Sponsors", "Veil Sponsors"])
                        if (PAIRED_SECTIONS.has(category) && members.length === 2) {
                          const left = members[0]
                          const right = members[1]
                          return (
                            <>
                              <div className="px-1.5 sm:px-2 md:px-2.5">
                                <NameItem member={left} align="right" />
                              </div>
                              <div className="px-1.5 sm:px-2 md:px-2.5">
                                <NameItem member={right} align="left" />
                              </div>
                            </>
                          )
                        }
                        if (SINGLE_COLUMN_SECTIONS.has(category) || members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Default two-column sections: render row-by-row pairs to keep alignment on small screens
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
              
              {/* Display any other categories not in the ordered list */}
              {Object.keys(grouped).filter(cat => !ROLE_CATEGORY_ORDER.includes(cat) && cat !== "Other").map((category) => {
                const members = grouped[category]
                return (
                  <div key={category}>
                    <div className="flex justify-center py-3 sm:py-4 md:py-5 mb-5 sm:mb-6 md:mb-8">

                    </div>
                    <TwoColumnLayout singleTitle={category} centerContent={true}>
                      {(() => {
                        if (members.length <= 2) {
                          return (
                            <div className="col-span-full">
                              <div className="max-w-sm mx-auto flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                                {members.map((member, idx) => (
                                  <NameItem key={`${category}-${idx}-${member.Name}`} member={member} align="center" />
                                ))}
                              </div>
                            </div>
                          )
                        }
                        // Pair row-by-row for other categories as well
                        const half = Math.ceil(members.length / 2)
                        const left = members.slice(0, half)
                        const right = members.slice(half)
                        const maxLen = Math.max(left.length, right.length)
                        const rows = []
                        for (let i = 0; i < maxLen; i++) {
                          const l = left[i]
                          const r = right[i]
                          rows.push(
                            <React.Fragment key={`${category}-row-${i}`}>
                              <div key={`${category}-cell-left-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                {l ? <NameItem member={l} align="right" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                              <div key={`${category}-cell-right-${i}`} className="px-1.5 sm:px-2 md:px-2.5">
                                {r ? <NameItem member={r} align="left" /> : <div className="py-0.5 sm:py-1 md:py-1.5" />}
                              </div>
                            </React.Fragment>
                          )
                        }
                        return rows
                      })()}
                    </TwoColumnLayout>
                  </div>
                )
              })}
            </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}