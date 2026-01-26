"use client"

import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import Image from "next/image"

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
      {/* Corner decoration - top left */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/corner2-removebg-preview.png"
          alt="Corner decoration top left"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
          priority={false}
        />
      </div>
      
      {/* Corner decoration - top right */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/corner2-removebg-preview.png"
          alt="Corner decoration top right"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
          style={{ transform: 'scaleX(-1)' }}
          priority={false}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2rem] border border-[#95B2A0]/70 bg-[#95B2A0]/95 backdrop-blur-2xl shadow-[0_16px_60px_rgba(149,178,160,0.35)] px-4 sm:px-5 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="relative text-center space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8">
          {/* Main heading */}
          <div className="space-y-1 sm:space-y-1.5 md:space-y-2.5">
            <p
              className={`${cormorant.className} text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-sm uppercase tracking-[0.24em] sm:tracking-[0.28em] text-white`}
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
            >
              {groomName} &amp; {brideName}
            </p>
            <h2
              className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.9rem] text-white`}
              style={{ textShadow: "0 3px 14px rgba(0,0,0,0.5)" }}
            >
              Welcome to our wedding website
            </h2>


            {/* Verse */}
            <div className="space-y-0.5 sm:space-y-1">
              <p
                className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base text-white italic leading-relaxed`}
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
              >
                &quot;In God&apos;s perfect time, love grows and all things become beautiful.&quot;
              </p>
              <p
                className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base text-white italic leading-relaxed`}
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
              >
                &quot;Love bears all things, hopes all things, endures all things.&quot;
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="h-px w-10 sm:w-16 md:w-20 bg-white/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
              <span className="h-px w-10 sm:w-16 md:w-20 bg-white/40" />
            </div>
          </div>

          {/* Body text */}
          <div
            className={`${cormorant.className} text-[0.75rem] sm:text-[0.85rem] md:text-sm lg:text-base leading-relaxed sm:leading-6 md:leading-7 text-white space-y-2.5 sm:space-y-3 md:space-y-4`}
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


