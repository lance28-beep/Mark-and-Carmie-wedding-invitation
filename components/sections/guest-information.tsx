"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Car, Navigation, MapPin } from "lucide-react"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import Image from "next/image"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

export function GuestInformation() {

  return (
    <Section
      id="guest-information"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
        >
          Important Guidelines
        </p>

        <h2
          className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4"
        >
          Guest Information
        </h2>

        <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          Everything you need to know to make your experience smooth and enjoyable
        </p>

        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mb-4 sm:mb-7 max-w-4xl mx-auto px-3 sm:px-5">
        {/* Important Information Header */}
        <div className="text-center mb-3 sm:mb-5">
          <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 text-white">
            Important Information
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-white max-w-xl mx-auto leading-relaxed">
            Kindly take note of these details to help the day flow smoothly and beautifully.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Attire Guidelines */}
          <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-[#606C60]/30 bg-[#F5F2ED] backdrop-blur-lg shadow-[0_20px_50px_rgba(96,108,96,0.2)] p-3 sm:p-6 md:p-8 lg:p-10 xl:p-14 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-[#606C60]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-28 h-28 sm:w-40 sm:h-40 bg-[#606C60]/5 rounded-full blur-3xl" />
            </div>

            {/* Title */}
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                <h4 className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#606C60] drop-shadow-sm`}>
                  Wedding
                </h4>
                <h4 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#606C60] opacity-90">
                  ATTIRE
                </h4>
              </div>
              {/* Decorative underline */}
              <div className="mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-1.5 sm:gap-2">
                <div className="w-6 sm:w-8 md:w-12 h-px bg-[#606C60]/30" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#606C60]/50 rounded-full" />
                <div className="w-6 sm:w-8 md:w-12 h-px bg-[#606C60]/30" />
              </div>
            </div>

            {/* Guest Attire Image */}
            <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 relative z-10 px-2">
              <div className="relative w-full max-w-2xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                <Image
                  src="/Details/guestAttire.png"
                  alt="Guest Attire Guide"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Description Text */}
            <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 relative z-10 px-2">
              <div className="mb-3 sm:mb-4 md:mb-5">
                <h5 className={`${cinzel.className} text-base sm:text-lg md:text-xl lg:text-2xl text-center text-[#606C60] mb-2 sm:mb-3`}>
                  Attire guide
                </h5>
                <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg text-center text-[#606C60] font-semibold`}>
                  Strictly semi formal/ formal attire
                </p>
              </div>
              <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center text-[#606C60] max-w-3xl mx-auto leading-relaxed sm:leading-loose`}>
                We know many like to come dressed to compliment the big day. Provided below is the color palette of our day. We look forward to seeing you all!
              </p>
            </div>

            {/* Color Palette - 3 blocks with arched tops */}
            <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 relative z-10">
              {/* Color 1: #CDA38B */}
              <div className="flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[160px] group">
                <div 
                  className="w-full h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                  style={{ 
                    backgroundColor: '#CDA38B',
                    clipPath: 'polygon(0 12%, 50% 0%, 100% 12%, 100% 100%, 0% 100%)',
                    borderRadius: '0 0 4px 4px',
                    boxShadow: '0 2px 8px rgba(205, 163, 139, 0.25)',
                    border: '2px solid rgba(205, 163, 139, 0.3)'
                  }}
                />
              </div>
              
              {/* Color 2: #E4C9B8 */}
              <div className="flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[160px] group">
                <div 
                  className="w-full h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                  style={{ 
                    backgroundColor: '#E4C9B8',
                    clipPath: 'polygon(0 12%, 50% 0%, 100% 12%, 100% 100%, 0% 100%)',
                    borderRadius: '0 0 4px 4px',
                    boxShadow: '0 2px 8px rgba(228, 201, 184, 0.25)',
                    border: '2px solid rgba(228, 201, 184, 0.3)'
                  }}
                />
              </div>
              
              {/* Color 3: #F4EBE2 */}
              <div className="flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[160px] group">
                <div 
                  className="w-full h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                  style={{ 
                    backgroundColor: '#F4EBE2',
                    clipPath: 'polygon(0 12%, 50% 0%, 100% 12%, 100% 100%, 0% 100%)',
                    borderRadius: '0 0 4px 4px',
                    boxShadow: '0 2px 8px rgba(244, 235, 226, 0.25)',
                    border: '2px solid rgba(244, 235, 226, 0.3)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Arrival Time & Reception Guidelines */}
          <div className="relative rounded-xl sm:rounded-2xl border-2 border-[#606C60]/30 bg-[#F5F2ED] backdrop-blur-lg shadow-[0_18px_40px_rgba(96,108,96,0.15)] p-3.5 sm:p-5 md:p-6 overflow-hidden">
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {/* Arrival Time */}
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#606C60]/30 shadow-lg bg-[#F5F2ED] p-3 sm:p-4 md:p-5 lg:p-6">
                <div className="mb-2 sm:mb-3">
                  <h4 className={`${cinzel.className} text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-[#606C60] mb-2 sm:mb-3`}>
                    Arrival Time
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#606C60] leading-relaxed`}>
                      Kindly arrive by <span className="font-semibold text-[#606C60]">3:30 PM</span> so we can begin the wedding ceremony promptly at exactly <span className="font-semibold text-[#606C60]">4:00 PM</span>.
                    </p>
                    <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#606C60] leading-relaxed`}>
                      Your punctuality means so much to us — and don&apos;t forget to have a light snack beforehand so you can enjoy the celebration comfortably!
                    </p>
                  </div>
                </div>
              </div>

              {/* Reception Guidelines */}
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#606C60]/30 shadow-lg bg-[#F5F2ED] p-3 sm:p-4 md:p-5 lg:p-6">
                <div className="mb-2 sm:mb-3">
                  <h4 className={`${cinzel.className} text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-[#606C60] mb-2 sm:mb-3`}>
                    Reception Guidelines
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#606C60] leading-relaxed`}>
                      The seating will be formal, RSVP-style. That&apos;s why we&apos;re asking you to fill out this invitation form to secure your spot. Kindly do not bring plus ones unless explicitly stated in your invitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Parking - Compact */}
          <div className="relative rounded-xl sm:rounded-2xl border-2 border-[#606C60]/30 bg-[#F5F2ED] backdrop-blur-lg shadow-[0_18px_40px_rgba(96,108,96,0.15)] p-3.5 sm:p-5 md:p-6 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3 relative z-10">
              <div className="p-1.5 rounded-full shadow-md bg-[#F5F2ED] border-2 border-[#606C60]/30">
                <Car className="w-3.5 h-3.5 text-[#606C60]" />
              </div>
              <h4 className={`${cinzel.className} font-semibold text-xs sm:text-sm md:text-base text-[#606C60]`}>Parking &amp; Travel</h4>
            </div>

            <div className="space-y-3 relative z-10">
              {/* Parking */}
              <div className="rounded-xl p-2.5 sm:p-3 border-2 border-[#606C60]/30 bg-[#F5F2ED] shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#606C60] text-[#E1D5C7]">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`${cormorant.className} text-[11px] sm:text-sm md:text-base font-semibold text-[#606C60]`}>Parking Available</p>
                    <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#606C60]/85`}>
                      Parking is available at the venue. Please arrive early to find a comfortable spot.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="rounded-xl p-2.5 sm:p-3 border-2 border-[#606C60]/30 bg-[#F5F2ED] shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#606C60] text-[#E1D5C7]">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`${cormorant.className} text-[11px] sm:text-sm md:text-base font-semibold text-[#606C60]`}>Transportation</p>
                    <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#606C60]/85`}>
                      Private vehicles and local transport are welcome. Coordinate with friends or family and plan your
                      route ahead of time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-xl p-2.5 sm:p-3 border-2 border-[#606C60]/30 bg-[#F5F2ED]">
                <p className={`${cormorant.className} text-[11px] sm:text-sm md:text-base font-semibold mb-2 flex items-center gap-2 text-[#606C60]`}>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#606C60]/10 text-[#606C60]">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Quick Tips
                </p>
                <ul className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm space-y-1 text-[#606C60]/90`}>
                  <li className="flex items-start gap-2">
                    <span className="text-[#606C60] mt-0.5">•</span>
                    <span>Plan your route ahead to avoid unexpected delays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#606C60] mt-0.5">•</span>
                    <span>Please avoid walking during the ceremony. Approach the coordinator or wait to be guided.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#606C60] mt-0.5">•</span>
                    <span>Coordinate carpooling with friends or family when possible.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

