"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { StorySection } from '@/components/StorySection';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

export function LoveStory() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background - same as gallery */}
      <div className="absolute inset-0 -z-10 bg-[#f4ecff]" />

      {/* Flower decoration - top left corner */}
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
      {/* Flower decoration - top right corner */}
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
      {/* Flower decoration - left bottom corner */}
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
      {/* Flower decoration - right bottom corner */}
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

      {/* SECTION 1: Top - Dark */}
      <div className="relative">
        <StorySection
          theme="dark"
          layout="image-left"
          isFirst={true}
          imageSrc="/gallery/couple (2).jpg"
          title="Our Love Story"
          text={
            <>
              <p className="mb-4">
              A Love Written in His Time and Grace
              </p>
              <p>
              Carmie, a strong and independent eldest daughter who had spent 14 years in prayerful waiting, carried in her heart a quiet promise—to accept as her husband only the man God had lovingly chosen for her.
              Mark, after seasons of heartache and disappointment, laid his desires at the Lord’s feet, praying that this time he would listen, trust God’s will and His divine grace, and joyfully marry the woman God had chosen for him.
              </p>
            </>
          }
        />
      </div>

      {/* SECTION 2: Middle - Light */}
      <div className="relative">
        <StorySection
          theme="light"
          layout="image-right"
          imageSrc="/mobile-background/couple (7).webp"
          text={
            <>
              <p>
              Through the gentle introduction of Mark’s mother, Mark and Carmie—once college schoolmates who had never truly met—found their paths crossing in the simplest way, through a message. What began as conversation soon unfolded into discovery, as they realized they shared more than common interests: they shared a deep love for God and a heartfelt desire to serve Him. As their words turned into prayers and their conversations into faith, God quietly and lovingly revealed in His perfect time that He had chosen them to love, walk, and serve Him TOGETHER.
              </p>
            </>
          }
        />
      </div>

      {/* SECTION 3: Bottom - Dark */}
      <div className="relative">
        <StorySection
          theme="dark"
          layout="image-left"
          isLast={true}
          imageSrc="/gallery/couple (6).jpg"
          text={
            <>
              <p>
              When God’s guidance became clear—through earnest prayer and time spent in His Word—Mark and Carmie stepped forward in faith and chose to be married after four months of knowing one another. To some, it seemed swift; to others, a whirlwind.
              </p>
              <p className="mt-4">
              By worldly measure, it might have been called impulsive. But in God’s perfect timing and eternal plan, it was neither rushed nor random—IT WAS RIGHT and IT WAS TIME!
              </p>
              <p className="mt-4">
              "Habakkuk 2:3 For the vision awaits its appointed time; it hastens to the end—it will not lie. If it seems slow, wait for it; it will surely come; it will not delay."
              </p>
            </>
          }
        />
      </div>
      
      {/* Footer - same decoration and button style as gallery section */}
      <div className="relative z-10 pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24 text-center px-4">
        {/* Decoration - line + pulsing dot (same as gallery header) */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#c9b2ff] to-transparent" />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#5b3c8a]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#c9b2ff] to-transparent" />
        </div>
        {/* Join us button - same style as gallery "View Full Gallery" button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex justify-center"
        >
          <Link
            href="#guest-list"
            className={`${cinzel.className} group inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 rounded-sm font-normal transition-all duration-300 uppercase tracking-[0.25em] text-[0.7rem] sm:text-xs md:text-sm whitespace-nowrap relative overflow-hidden border backdrop-blur-sm text-[#2d3b2c] bg-[#B3CEAF] border-[#9db89a] shadow-[0_10px_28px_rgba(179,206,175,0.4)] hover:bg-[#9db89a] hover:border-[#8aa886] hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(179,206,175,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B3CEAF] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
          >
            <span className="relative z-10">Join us</span>
            <motion.div
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -skew-x-12 -translate-x-full group-hover:translate-x-full" />
            <motion.div
              className="absolute inset-0 bg-[#B3CEAF]/30 rounded-sm blur-xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </Link>
        </motion.div>
      </div>

    </div>
  );
}

