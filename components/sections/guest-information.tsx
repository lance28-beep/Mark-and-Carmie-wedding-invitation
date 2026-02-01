"use client"

import { Section } from "@/components/section"
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
      {/* Header - white text for section title area */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
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
        {/* Important Information Header - white text */}
        <div className="text-center mb-3 sm:mb-5">
          <h3 className="text-base sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 text-white">
            Important Information
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-white max-w-xl mx-auto leading-relaxed">
            Kindly take note of these details to help the day flow smoothly and beautifully.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Attire Guidelines - white background */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-[#c9b2ff]/60 bg-white shadow-[0_10px_26px_rgba(91,60,138,0.24)] hover:shadow-[0_16px_34px_rgba(91,60,138,0.32)] hover:border-[#c9b2ff] transition-all duration-300 p-3 sm:p-6 md:p-8 lg:p-10 xl:p-14">
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
                <h4 className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#B58E65] drop-shadow-sm`}>
                  Wedding
                </h4>
                <h4 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#B58E65] opacity-90">
                  ATTIRE
                </h4>
              </div>
              <div className="mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-1.5 sm:gap-2">
                <div className="w-6 sm:w-8 md:w-12 h-px bg-[#B58E65]/30" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#B58E65]/50 rounded-full" />
                <div className="w-6 sm:w-8 md:w-12 h-px bg-[#B58E65]/30" />
              </div>
            </div>

            {/* Attire images: Ninang, Ninong, Guest */}
            <div className="mb-5 sm:mb-6 md:mb-8 lg:mb-10 relative z-10 px-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] max-h-[280px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/Details/ninang.png"
                      alt="Ninang Attire Guide"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 280px"
                    />
                  </div>
                  <p className={`${cinzel.className} mt-2 sm:mt-3 text-sm sm:text-base font-medium text-[#B58E65]`}>Ninang</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] max-h-[280px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/Details/Ninong.png"
                      alt="Ninong Attire Guide"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 280px"
                    />
                  </div>
                  <p className={`${cinzel.className} mt-2 sm:mt-3 text-sm sm:text-base font-medium text-[#B58E65]`}>Ninong</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-[3/4] max-h-[280px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/Details/guest.png"
                      alt="Guest Attire Guide"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 280px"
                    />
                  </div>
                  <p className={`${cinzel.className} mt-2 sm:mt-3 text-sm sm:text-base font-medium text-[#B58E65]`}>Guest</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 md:gap-8 text-center mt-3 sm:mt-4">
                <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#B58E65]`}>
                  <span className="font-semibold">Ladies:</span> Long dress / Sabbath Dress / Cocktail dress
                </p>
                <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#B58E65]`}>
                  <span className="font-semibold">Gentlemen:</span> Longsleeves / Polo, Slacks
                </p>
              </div>
            </div>

            {/* Color Palette - circles + name below; placed directly under guest attire images */}
            <div className="flex flex-nowrap items-end justify-center gap-1.5 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 relative z-10 sm:flex-wrap p-2 sm:p-5 md:p-6 rounded-xl bg-white/80 mb-5 sm:mb-6 md:mb-8 lg:mb-10">
              {[
                { hex: '#E8CDB8', name: 'Beige' },
                { hex: '#DDBDA6', name: 'Nude' },
                { hex: '#B58E65', name: 'Camel' },
                { hex: '#EDE0D7', name: 'Light Beige' },
              ].map(({ hex, name }) => {
                const r = parseInt(hex.slice(1, 3), 16)
                const g = parseInt(hex.slice(3, 5), 16)
                const b = parseInt(hex.slice(5, 7), 16)
                return (
                  <div key={name} className="flex flex-col items-center group shrink-0">
                    <div
                      className="w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                      style={{
                        backgroundColor: hex,
                        boxShadow: `0 2px 8px rgba(${r}, ${g}, ${b}, 0.25)`,
                      }}
                    />
                    <p className={`${cormorant.className} mt-1 sm:mt-3 text-[8px] sm:text-xs md:text-sm font-medium text-[#B58E65] leading-tight`}>
                      {name}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="relative z-10 px-2">
              <div className="mb-3 sm:mb-4 md:mb-5">
                <h5 className={`${cinzel.className} text-base sm:text-lg md:text-xl lg:text-2xl text-center text-[#B58E65] mb-2 sm:mb-3`}>
                  Attire guide
                </h5>
                <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg text-center text-[#B58E65] font-semibold`}>
                  Strictly semi formal/ formal attire
                </p>
              </div>
              <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center text-[#B58E65]/90 max-w-3xl mx-auto leading-relaxed sm:leading-loose`}>
                We know many like to come dressed to compliment the big day. Provided above is the color palette of our day. We look forward to seeing you all!
              </p>
            </div>
          </div>

          {/* Arrival Time & Reception Guidelines - white background */}
          <div className="relative rounded-xl sm:rounded-2xl border border-[#c9b2ff]/60 bg-white shadow-[0_10px_26px_rgba(91,60,138,0.24)] hover:shadow-[0_16px_34px_rgba(91,60,138,0.32)] hover:border-[#c9b2ff] transition-all duration-300 p-3.5 sm:p-5 md:p-6 overflow-hidden">
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#c9b2ff]/60 shadow-sm bg-white p-3 sm:p-4 md:p-5 lg:p-6">
                <div className="mb-2 sm:mb-3">
                  <h4 className={`${cinzel.className} text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-[#B58E65] mb-2 sm:mb-3`}>
                    Arrival Time
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#B58E65]/95 leading-relaxed`}>
                      Kindly arrive by <span className="font-semibold text-[#B58E65]">2:30 PM</span> so we can begin the wedding ceremony promptly at exactly <span className="font-semibold text-[#B58E65]">3:00 PM</span>.
                    </p>
                    <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#B58E65]/95 leading-relaxed`}>
                      Your punctuality means so much to us — and don&apos;t forget to have a light snack beforehand so you can enjoy the celebration comfortably!
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#c9b2ff]/60 shadow-sm bg-white p-3 sm:p-4 md:p-5 lg:p-6">
                <div className="mb-2 sm:mb-3">
                  <h4 className={`${cinzel.className} text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-[#B58E65] mb-2 sm:mb-3`}>
                    Reception Guidelines
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#B58E65]/95 leading-relaxed`}>
                      The seating will be formal, RSVP-style. That&apos;s why we&apos;re asking you to fill out this invitation form to secure your spot. Kindly do not bring plus ones unless explicitly stated in your invitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parking & Travel - white background */}
          <div className="relative rounded-xl sm:rounded-2xl border border-[#c9b2ff]/60 bg-white shadow-[0_10px_26px_rgba(91,60,138,0.24)] hover:shadow-[0_16px_34px_rgba(91,60,138,0.32)] hover:border-[#c9b2ff] transition-all duration-300 p-3.5 sm:p-5 md:p-6 overflow-hidden">
            <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3 relative z-10">
              <div className="p-1.5 rounded-full shadow-md bg-white border border-[#c9b2ff]/60">
                <Car className="w-3.5 h-3.5 text-[#B58E65]" />
              </div>
              <h4 className={`${cinzel.className} font-semibold text-xs sm:text-sm md:text-base text-[#B58E65]`}>Parking &amp; Travel</h4>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#c9b2ff]/60 bg-white shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#B58E65] text-[#EDE0D7]">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`${cormorant.className} text-[11px] sm:text-sm md:text-base font-semibold text-[#B58E65]`}>Parking Available</p>
                    <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#B58E65]/90`}>
                      Parking is available at the venue. Please arrive early to find a comfortable spot.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-2.5 sm:p-3 border border-[#c9b2ff]/60 bg-white shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#B58E65] text-[#EDE0D7]">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`${cormorant.className} text-[11px] sm:text-sm md:text-base font-semibold text-[#B58E65]`}>Transportation</p>
                    <p className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-[#B58E65]/90`}>
                      Private vehicles and local transport are welcome. Coordinate with friends or family and plan your
                      route ahead of time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-2.5 sm:p-3 border border-[#c9b2ff]/60 bg-white">
                <p className={`${cormorant.className} text-[11px] sm:text-sm md:text-base font-semibold mb-2 flex items-center gap-2 text-[#B58E65]`}>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#B58E65]/15 text-[#B58E65]">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Quick Tips
                </p>
                <ul className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm space-y-1 text-[#B58E65]/90`}>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B58E65] mt-0.5">•</span>
                    <span>Plan your route ahead to avoid unexpected delays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B58E65] mt-0.5">•</span>
                    <span>Please avoid walking during the ceremony. Approach the coordinator or wait to be guided.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B58E65] mt-0.5">•</span>
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

