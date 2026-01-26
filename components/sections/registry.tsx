"use client"

import { useState } from "react"
import Image from "next/image"
import { Section } from "@/components/section"

export function Registry() {
  const [selectedQR, setSelectedQR] = useState<"gcash1" | "gcash2">("gcash1")

  return (
    <Section
      id="registry"
      className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>
        
        <h2 className="style-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2 sm:mb-3 md:mb-4">
          Gift Guide
        </h2>
        
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2">
          With all that we have we are truly blessed. Your Presence and prayer are that we request, but if you are thinking of giving a gift, to help us on our way a monetary or if you prefer to purchase a gift, feel free to surprise as on your on way.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative bg-[#BA94C3]/90 backdrop-blur-md border border-white/30 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-4 sm:p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Toggle Switch */}
            <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setSelectedQR("gcash1")}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  selectedQR === "gcash1"
                    ? "bg-[#95B2A0] text-white shadow-lg scale-105"
                    : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20 border border-white/30"
                }`}
              >
                GCash 1
              </button>
              <button
                onClick={() => setSelectedQR("gcash2")}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  selectedQR === "gcash2"
                    ? "bg-[#95B2A0] text-white shadow-lg scale-105"
                    : "bg-white/10 text-white/70 hover:text-white hover:bg-white/20 border border-white/30"
                }`}
              >
                GCash 2
              </button>
            </div>

            <div className="relative bg-white/95 rounded-xl sm:rounded-2xl border-2 border-dashed border-white/30 p-5 sm:p-6 md:p-8 text-center shadow-[0_6px_24px_rgba(0,0,0,0.15)] max-w-md">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#BA94C3]/90 px-3 py-1 rounded-full shadow-sm border-2 border-white/30 text-xs font-semibold tracking-[0.2em] text-white uppercase">
                GCash:
              </div>
              <div className="flex flex-col items-center gap-4 w-full mt-4">
                <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed border-white/30 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white relative overflow-hidden">
                  <Image
                    src={selectedQR === "gcash1" ? "/QR/Gcash_1.png" : "/QR/Gcash_2.png"}
                    alt={`GCash QR code ${selectedQR === "gcash1" ? "1" : "2"}`}
                    fill
                    sizes="256px"
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white/90 italic">
            Thank you from the bottom of our hearts.
          </p>
        </div>
      </div>
    </Section>
  )
}
