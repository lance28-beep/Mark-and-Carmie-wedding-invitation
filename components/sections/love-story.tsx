"use client"

import React from 'react';
import Link from 'next/link';
import { StorySection } from '@/components/StorySection';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

export function LoveStory() {
  return (
    <div className="min-h-screen bg-[#606C60] overflow-x-hidden">
      
      {/* SECTION 1: Top - Dark */}
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
              Our story began with a simple signature, one that slowly turned into something magical. He was my financial advisor, and I was there to sign documents. It was July 5, 2021, and we met at the Lobby of the building. Little did we know, that ordinary day would start a story neither of us expected.
            </p>
          </>
        }
      />

      {/* SECTION 2: Middle - Light */}
      <StorySection
        theme="light"
        layout="image-right"
        imageSrc="/mobile-background/couple (31).webp"
        text={
          <>
            <p>
              I wasn&apos;t looking for anything, yet somehow, our connection grew in its own gentle, unexpected way. And then, on June 1, 2022, our story truly began—we became us. We found a love that feels like home.
            </p>
          </>
        }
      />

      {/* SECTION 3: Bottom - Dark */}
      <StorySection
        theme="dark"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (10).webp"
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
      
      {/* Footer Decoration */}
      <div className="bg-[#606C60] pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24 text-center text-[#E1D5C7] z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-[#E1D5C7] mx-auto mb-4 sm:mb-6 opacity-30"></div>
        <Link 
          href="#guest-list"
          className={`${cinzel.className} group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-[0.7rem] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-normal text-[#606C60] bg-[#E1D5C7] rounded-sm border border-[#E1D5C7] transition-all duration-300 hover:bg-[#d4c5b3] hover:border-[#d4c5b3] hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E1D5C7]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#606C60]`}
        >
          <span className="relative z-10">Join us</span>
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 rounded-sm bg-[#E1D5C7] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-0"></div>
        </Link>
      </div>

    </div>
  );
}

