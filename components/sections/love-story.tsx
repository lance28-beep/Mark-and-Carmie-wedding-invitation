"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StorySection } from '@/components/StorySection';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

export function LoveStory() {
  return (
    <div className="min-h-screen bg-[#95B2A0] overflow-x-hidden">
      
      {/* SECTION 1: Top - Dark */}
      <div className="relative">
        {/* Corner decoration - top left */}
        <div className="absolute left-0 top-0 z-0 pointer-events-none">
          <Image
            src="/decoration/corner-image.png"
            alt="Corner decoration"
            width={300}
            height={300}
            className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
            priority={false}
          />
        </div>
        {/* Corner decoration - top right */}
        <div className="absolute right-0 top-0 z-0 pointer-events-none">
          <Image
            src="/decoration/corner-image.png"
            alt="Corner decoration"
            width={300}
            height={300}
            className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
            style={{ transform: 'scaleX(-1)' }}
            priority={false}
          />
        </div>
        <StorySection
          theme="dark"
          layout="image-left"
          isFirst={true}
          imageSrc="/mobile-background/couple (1).webp"
          title="Our story"
          text={
            <>
              <p className="mb-4">
                Once upon a signature…
              </p>
              <p>
              Our story began with a single signature—an unremarkable moment that quietly unfolded into something extraordinary. He was my financial advisor, and I had come merely to sign documents. On July 2021, we met in the lobby of the building, unaware that fate had already taken note. What seemed like an ordinary day became the first chapter of a love story neither of us saw coming.
              </p>
            </>
          }
        />
      </div>

      {/* SECTION 2: Middle - Light */}
      <div className="relative">
        {/* Corner decoration - top left */}
        <div className="absolute left-0 top-0 z-0 pointer-events-none">
          <Image
            src="/decoration/corner-image.png"
            alt="Corner decoration"
            width={300}
            height={300}
            className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
            priority={false}
          />
        </div>
        {/* Corner decoration - top right */}
        <div className="absolute right-0 top-0 z-0 pointer-events-none">
          <Image
            src="/decoration/corner-image.png"
            alt="Corner decoration"
            width={300}
            height={300}
            className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
            style={{ transform: 'scaleX(-1)' }}
            priority={false}
          />
        </div>
        <StorySection
          theme="light"
          layout="image-right"
          imageSrc="/mobile-background/couple (7).webp"
          text={
            <>
              <p>
                I wasn&apos;t looking for anything, yet somehow, our connection grew in its own gentle, unexpected way. And then, on June 1, 2022, our story truly began—we became us. We found a love that feels like home.
              </p>
            </>
          }
        />
      </div>

      {/* SECTION 3: Bottom - Dark */}
      <div className="relative">
        {/* Corner decoration - top left */}
        <div className="absolute left-0 top-0 z-0 pointer-events-none">
          <Image
            src="/decoration/corner-image.png"
            alt="Corner decoration"
            width={300}
            height={300}
            className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
            priority={false}
          />
        </div>
        {/* Corner decoration - top right */}
        <div className="absolute right-0 top-0 z-0 pointer-events-none">
          <Image
            src="/decoration/corner-image.png"
            alt="Corner decoration"
            width={300}
            height={300}
            className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-70"
            style={{ transform: 'scaleX(-1)' }}
            priority={false}
          />
        </div>
        <StorySection
          theme="dark"
          layout="image-left"
          isLast={true}
          imageSrc="/mobile-background/couple (6).webp"
          text={
            <>
              <p>
                Our journey wasn&apos;t rushed, but perfectly timed. We believe that God brought us together in His own way and season.
              </p>
              <p className="mt-4">
                With hearts full of gratitude, we step into this new chapter hand in hand, trusting His plan and celebrating a love rooted in faith, patience, and grace.
              </p>
              <p className="mt-4">
                Today, we choose each other- again and again- and we can&apos;t wait to celebrate this new chapter with the people we love most.
              </p>
            </>
          }
        />
      </div>
      
      {/* Footer Decoration */}
      <div className="bg-[#95B2A0] pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24 text-center text-white z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-white mx-auto mb-4 sm:mb-6 opacity-30"></div>
        <Link 
          href="#guest-list"
          className={`${cinzel.className} group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-[0.7rem] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-normal text-white bg-white/10 rounded-sm border border-white/30 transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#95B2A0]`}
        >
          <span className="relative z-10">Join us</span>
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 rounded-sm bg-white opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-0"></div>
        </Link>
      </div>

    </div>
  );
}

