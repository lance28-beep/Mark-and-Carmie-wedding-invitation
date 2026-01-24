"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond, Cinzel } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

export function Welcome() {
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom
  return (
    <Section
      id="welcome"
      className="relative overflow-hidden bg-transparent py-12 sm:py-16 md:py-20"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2rem] border border-[#E1D5C7]/70 bg-[#E1D5C7]/95 backdrop-blur-2xl shadow-[0_16px_60px_rgba(225,213,199,0.35)] px-4 sm:px-5 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
          {/* Layered glass + light accents for readability */}
          <div className="pointer-events-none absolute inset-0">
            {/* Solid primary background with slight transparency */}
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundColor: "rgba(225, 213, 199, 0.95)",
              }}
            />
            {/* Subtle radial highlights */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(225,213,199,0.35),transparent_60%)] opacity-80" />
            <div className="absolute bottom-[-6rem] right-[-2rem] w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(225,213,199,0.25),transparent_60%)] opacity-85" />
            {/* Inner border glow */}
            <div className="absolute inset-[1px] rounded-[inherit] border border-[#E1D5C7]/30" />
          </div>

          <div className="relative text-center space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8">
          {/* Main heading */}
          <div className="space-y-1 sm:space-y-1.5 md:space-y-2.5">
            <p
              className={`${cormorant.className} text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-sm uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#606C60]`}
              style={{ textShadow: "0 1px 8px rgba(96,108,96,0.4)" }}
            >
              {groomName} &amp; {brideName}
            </p>
            <h2
              className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.9rem] text-[#606C60]`}
              style={{ textShadow: "0 3px 14px rgba(96,108,96,0.5)" }}
            >
              Welcome to our wedding website
            </h2>


            {/* Verse */}
            <div className="space-y-0.5 sm:space-y-1">
              <p
                className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base text-[#606C60]/90 italic leading-relaxed`}
                style={{ textShadow: "0 1px 8px rgba(96,108,96,0.3)" }}
              >
                &quot;In God&apos;s perfect time, love grows and all things become beautiful.&quot;
              </p>
              <p
                className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base text-[#606C60]/90 italic leading-relaxed`}
                style={{ textShadow: "0 1px 8px rgba(96,108,96,0.3)" }}
              >
                &quot;Love bears all things, hopes all things, endures all things.&quot;
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="h-px w-10 sm:w-16 md:w-20 bg-[#606C60]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#606C60] shadow-[0_0_14px_rgba(96,108,96,0.8)]" />
              <span className="h-px w-10 sm:w-16 md:w-20 bg-[#606C60]/40" />
            </div>
          </div>

          {/* Body text */}
          <div
            className={`${cormorant.className} text-[0.75rem] sm:text-[0.85rem] md:text-sm lg:text-base leading-relaxed sm:leading-6 md:leading-7 text-[#606C60] space-y-2.5 sm:space-y-3 md:space-y-4`}
          >
            <p>
              We&apos;ve found a love that&apos;s a true blessing, and we give thanks to God for writing the
              beautiful story of our journey together. With hearts full of gratitude, we&apos;re excited to share
              this blessing with you! Thank you for your love, prayers, and support. We can&apos;t wait to celebrate
              this joyful day together!
            </p>
            <p>
              Feel free to browse through important information and other helpful reminders — everything you
              need to join us in this celebration!
            </p>
          </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


