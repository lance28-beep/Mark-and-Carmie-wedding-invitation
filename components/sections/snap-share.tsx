"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Download, Check } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond, Cinzel } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})

export function SnapShare() {
  const [copiedHashtagIndex, setCopiedHashtagIndex] = useState<number | null>(null)
  const [copiedAllHashtags, setCopiedAllHashtags] = useState(false)
  const [copiedDriveLink, setCopiedDriveLink] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const driveLink = "https://drive.google.com/drive/folders/1a954egIMse2DN00Kv3cSNmmn0miT410d?usp=sharing"
  const hashtags = [
    siteConfig.snapShare.hashtag
  ]
  const allHashtagsText = hashtags.join(" ")
  const groomNickname = siteConfig.couple.groomNickname
  const brideNickname = siteConfig.couple.brideNickname
  const sanitizedGroomName = groomNickname.replace(/\s+/g, "")
  const sanitizedBrideName = brideNickname.replace(/\s+/g, "")

  const shareText = `Celebrate ${groomNickname} & ${brideNickname}'s wedding! Explore the details and share your special memories: ${websiteUrl} ${allHashtagsText} ✨`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])


  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `${sanitizedGroomName.toLowerCase()}-${sanitizedBrideName.toLowerCase()}-wedding-qr.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const downloadDriveQRCode = () => {
    const canvas = document.getElementById("drive-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "drive-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyHashtag = async (hashtag: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hashtag)
      setCopiedHashtagIndex(index)
      setTimeout(() => setCopiedHashtagIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyAllHashtags = async () => {
    try {
      await navigator.clipboard.writeText(allHashtagsText)
      setCopiedAllHashtags(true)
      setTimeout(() => setCopiedAllHashtags(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyDriveLink = async () => {
    if (driveLink) {
      try {
        await navigator.clipboard.writeText(driveLink)
        setCopiedDriveLink(true)
        setTimeout(() => setCopiedDriveLink(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <Section
      id="snap-share"
      className="relative overflow-hidden py-8 sm:py-16 md:py-20 lg:py-24"
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

      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 md:px-8">
        <motion.div
          className="text-center mb-5 sm:mb-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#5b3c8a]/30 bg-white/60 backdrop-blur-sm px-3 py-1.5 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#5b3c8a] shadow-sm">
            Share Your Memories
          </div>
          <h2
            className={`${cinzel.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#4a2c6d] mt-2 sm:mt-4 drop-shadow-sm`}
          >
            Capture & Share the Celebration
          </h2>
          <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-[#5b3c8a] max-w-2xl mx-auto mt-2 sm:mt-4 leading-relaxed px-2`}>
            Capture the beautiful moments of {groomNickname} & {brideNickname}'s wedding day. Share your favorite memories so our keepsake gallery glows with every smile, embrace, and celebration from this special day.
          </p>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-5">
            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#c9b2ff] to-transparent" />
            <div className="w-1 h-1 bg-[#5b3c8a] rounded-full" />
            <div className="w-1 h-1 bg-[#c9b2ff] rounded-full" />
            <div className="w-1 h-1 bg-[#5b3c8a] rounded-full" />
            <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#c9b2ff] to-transparent" />
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-10" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div
            className="h-full lg:order-1"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-[22px] p-3 sm:p-5 md:p-8 shadow-[0_20px_60px_rgba(91,60,138,0.25)] h-full flex flex-col justify-start border border-[#c9b2ff]/50">
              <div className="flex flex-col w-full">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#4a2c6d] mb-2 sm:mb-4 text-center`}>
                  Our Favorite Moments
                </h4>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:gap-4">
                  <motion.div
                    className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#c9b2ff]/40 hover:border-[#a889ff] transition-all"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image src="/mobile-background/couple (7).webp" alt="Wedding moment 1" fill className="object-cover" style={{ imageOrientation: "from-image" }} />
                  </motion.div>
                  <motion.div
                    className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#c9b2ff]/40 hover:border-[#a889ff] transition-all"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image src="/mobile-background/couple (2).webp" alt="Wedding moment 2" fill className="object-cover" style={{ imageOrientation: "from-image" }} />
                  </motion.div>
                  <motion.div
                    className="relative col-span-2 aspect-[3/2] rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-[#c9b2ff]/40 hover:border-[#a889ff] transition-all"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image src="/desktop-background/couple (2).webp" alt="Wedding moment 3" fill className="object-cover" />
                  </motion.div>
                </div>
                <p className={`${cormorant.className} text-[#5b3c8a] text-xs sm:text-sm text-center mt-3 sm:mt-5 px-1.5 leading-relaxed`}>
                  Share your snapshots to be featured in our keepsake gallery.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-3 sm:space-y-5 lg:space-y-6 h-full flex flex-col lg:order-2" variants={fadeInUp}>
            <div className="flex-1">
              <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-[22px] p-3 sm:p-5 md:p-8 shadow-[0_20px_60px_rgba(91,60,138,0.25)] text-center h-full flex flex-col border border-[#c9b2ff]/50">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-[#4a2c6d] mb-2 sm:mb-3`}>
                  Share Our Wedding Website
                </h4>
                <p className={`${cormorant.className} text-[#5b3c8a] text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed px-1`}>
                  Spread the word about {groomNickname} & {brideNickname}'s wedding celebration. Share this QR code with friends and family so they can join the celebration.
                </p>
                <div className="mx-auto inline-flex flex-col items-center bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] backdrop-blur-sm p-2.5 sm:p-5 md:p-7 rounded-xl sm:rounded-2xl shadow-md border border-[#c9b2ff]/40 mb-3 sm:mb-4 flex-1 justify-center">
                  <div className="mb-2 sm:mb-3 p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-[#c9b2ff]/30 shadow-sm">
                    <div className="bg-white p-1.5 sm:p-3 rounded-lg shadow-sm border border-[#c9b2ff]/20">
                      <QRCodeCanvas 
                        id="snapshare-qr" 
                        value={websiteUrl} 
                        size={isMobile ? 140 : 220} 
                        includeMargin 
                        className="bg-white" 
                      />
                    </div>
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-1.5 sm:gap-2 mx-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#B3CEAF] text-[#2d4a2a] border border-[#9ab896]/60 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-[#9ab896] transition-all duration-200 text-xs sm:text-sm font-semibold"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Download QR</span>
                  </button>
                </div>
                <p className={`${cormorant.className} text-[#5b3c8a] text-xs sm:text-sm mt-auto leading-relaxed`}>
                  Scan with any camera app to open the full invitation and schedule.
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-[20px] p-3 sm:p-5 md:p-7 shadow-[0_20px_60px_rgba(91,60,138,0.25)] border border-[#c9b2ff]/50">
              <h5 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-[#4a2c6d] mb-2 sm:mb-3 text-center`}>
                Use Our Hashtags
              </h5>
              <p className={`${cormorant.className} text-[#5b3c8a] text-xs sm:text-sm text-center mb-3 sm:mb-4 leading-relaxed`}>
                Tag your photos and posts with our wedding hashtags to join the celebration!
              </p>
              
              <div className="space-y-2.5 sm:space-y-3 mb-3 sm:mb-4">
                {hashtags.map((hashtag, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#c9b2ff]/40 shadow-sm hover:shadow-md hover:border-[#a889ff] transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                      <span className={`${cormorant.className} text-[#4a2c6d] font-bold text-sm sm:text-base md:text-lg break-all flex-1 text-center sm:text-left`}>
                        {hashtag}
                      </span>
                      <button
                        onClick={() => copyHashtag(hashtag, index)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[#2d4a2a] transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 whitespace-nowrap flex-shrink-0 border border-[#9ab896]/60 ${
                          copiedHashtagIndex === index ? "!bg-gradient-to-r !from-green-600 !to-green-500 !text-white" : "bg-[#B3CEAF] hover:bg-[#9ab896]"
                        }`}
                      >
                        {copiedHashtagIndex === index ? (
                          <>
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className={`${cormorant.className} text-xs sm:text-sm font-medium`}>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className={`${cormorant.className} text-xs sm:text-sm font-medium`}>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={copyAllHashtags}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-lg border-2 border-[#9ab896]/60 transition-all duration-200 shadow-md hover:shadow-lg hover:border-[#9ab896] ${
                  copiedAllHashtags ? "!bg-gradient-to-r !from-green-500 !to-green-600 !text-white !border-green-400/60" : "bg-[#B3CEAF] text-[#2d4a2a] hover:bg-[#9ab896]"
                }`}
              >
                {copiedAllHashtags ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className={`${cormorant.className} text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]`}>All Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className={`${cormorant.className} text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]`}>Copy All Hashtags</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-lg sm:rounded-[20px] p-3 sm:p-5 md:p-7 shadow-[0_20px_60px_rgba(91,60,138,0.25)] border border-[#c9b2ff]/50">
              <h5 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-[#4a2c6d] mb-2 sm:mb-3 text-center`}>
                Share on Social Media
              </h5>
              <p className={`${cormorant.className} text-[#5b3c8a] text-xs sm:text-sm text-center mb-3 sm:mb-4 leading-relaxed`}>
                Help spread the word about {groomNickname} & {brideNickname}'s wedding celebration. Share the event across your favorite platforms.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] border border-[#c9b2ff]/40 text-[#5b3c8a] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:border-[#a889ff] hover:shadow-md transition-all duration-200 shadow-sm"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>Instagram</span>
                </button>
                <button
                  onClick={() => shareOnSocial("facebook")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] border border-[#c9b2ff]/40 text-[#5b3c8a] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:border-[#a889ff] hover:shadow-md transition-all duration-200 shadow-sm"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocial("tiktok")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] border border-[#c9b2ff]/40 text-[#5b3c8a] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:border-[#a889ff] hover:shadow-md transition-all duration-200 shadow-sm"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>TikTok</span>
                </button>
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] border border-[#c9b2ff]/40 text-[#5b3c8a] px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:border-[#a889ff] hover:shadow-md transition-all duration-200 shadow-sm"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className={`${cormorant.className} font-medium text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]`}>Twitter</span>
                </button>
              </div>
            </div>

            {driveLink && (
              <div>
                <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-[22px] p-3 sm:p-5 md:p-7 shadow-[0_20px_60px_rgba(91,60,138,0.25)] text-center border border-[#c9b2ff]/50">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#c9b2ff]/40 bg-gradient-to-r from-[#f8f4ff] to-[#ede4f7] px-2.5 py-1 text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.32em] text-[#5b3c8a] mb-2 sm:mb-3 shadow-sm">
                    Upload Your Photos & Videos
                  </div>
                  <p className={`${cormorant.className} text-[#5b3c8a] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 px-1`}>
                    Help us capture our special day! Scan the QR or use the actions below to drop your clips into our shared Drive.
                  </p>
                  <div className="mx-auto inline-flex flex-col items-center bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] backdrop-blur-sm p-2.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md border border-[#c9b2ff]/40 mb-3 sm:mb-4">
                    <div className="mb-2 sm:mb-3 p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-[#c9b2ff]/30 shadow-sm">
                      <div className="bg-white p-1.5 sm:p-3 rounded-lg shadow-sm border border-[#c9b2ff]/20">
                        <QRCodeCanvas id="drive-qr" value={driveLink} size={isMobile ? 130 : 200} includeMargin className="bg-white" />
                    </div>
                  </div>
                    <p className={`${cormorant.className} text-[#5b3c8a] text-xs sm:text-sm`}>📱 Scan with your camera app</p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                    <button
                      onClick={copyDriveLink}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-[#9ab896]/60 shadow-sm hover:shadow-md text-xs sm:text-sm transition-all ${
                        copiedDriveLink ? "!bg-gradient-to-r !from-green-600 !to-green-500 !text-white" : "bg-[#B3CEAF] text-[#2d4a2a] hover:bg-[#9ab896]"
                      }`}
                    >
                      {copiedDriveLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Copy Link</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadDriveQRCode}
                      className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#B3CEAF] text-[#2d4a2a] border border-[#9ab896]/60 shadow-sm hover:shadow-md hover:bg-[#9ab896] text-xs sm:text-sm transition-all font-semibold"
                    >
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Download QR</span>
                    </button>
                    <a
                      href={driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-br from-[#f8f4ff] to-[#ede4f7] border border-[#c9b2ff]/40 text-[#5b3c8a] shadow-sm hover:shadow-md hover:border-[#a889ff] text-xs sm:text-sm transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-medium`}>Open Drive</span>
                    </a>
                  </div>
                  <p className={`${cormorant.className} text-[#5b3c8a] text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed`}>or tap "Open Google Drive Folder."</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-5 sm:mt-10" variants={fadeInUp}>
          <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-[22px] p-4 sm:p-6 md:p-7 shadow-[0_25px_80px_rgba(91,60,138,0.25)] border border-[#c9b2ff]/50 max-w-3xl mx-auto">
            <p className={`${cormorant.className} text-[#5b3c8a] text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 px-2`}>
              Thank you for helping make {groomNickname} & {brideNickname}'s wedding celebration memorable. Your photos and messages create beautiful memories
              that will last a lifetime—keep sharing the joy throughout the evening.
            </p>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#c9b2ff] to-transparent" />
              <div className="w-1 h-1 bg-[#5b3c8a] rounded-full" />
              <div className="w-1 h-1 bg-[#c9b2ff] rounded-full" />
              <div className="w-1 h-1 bg-[#5b3c8a] rounded-full" />
              <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#c9b2ff] to-transparent" />
            </div>
            <div className={`${cormorant.className} flex items-center justify-center gap-2 text-[#5b3c8a] text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.32em] uppercase`}>
              <span>See you in the celebration</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}