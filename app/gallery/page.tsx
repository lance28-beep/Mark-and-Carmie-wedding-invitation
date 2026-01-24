import fs from "fs/promises"
import path from "path"
import Image from "next/image"
import MasonryGallery from "@/components/masonry-gallery"
import { siteConfig } from "@/content/site"
import { Cinzel, Cormorant_Garamond } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Generate on each request so newly added images in public/ appear without a rebuild
export const dynamic = "force-dynamic"

async function getImagesFrom(dir: string) {
  const abs = path.join(process.cwd(), "public", dir)
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile())
      .map((e) => `/${dir}/${e.name}`)
      .filter((p) => p.match(/\.(jpe?g|png|webp|gif)$/i))
      .sort((a, b) => {
        // Extract numeric part from filename for proper numerical sorting
        const numA = parseInt(a.match(/\/(\d+)\./)?.[1] || "0", 10)
        const numB = parseInt(b.match(/\/(\d+)\./)?.[1] || "0", 10)
        return numA - numB
      })
  } catch {
    return []
  }
}

export default async function GalleryPage() {
  const mobileImages = await getImagesFrom("mobile-background")
  const desktopImages = await getImagesFrom("desktop-background")
  const allImages = [...mobileImages, ...desktopImages]
  const images = allImages.map((src) => {
    const category = src.includes("mobile-background") ? "mobile" as const : "desktop" as const
    return { src, category }
  })

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 -z-10 bg-[#E1D5C7]"
      />
      
      {/* Flower decoration - top left corner */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60 scale-y-[-1]"
          priority={false}
          style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(8%) saturate(1000%) hue-rotate(100deg) brightness(95%) contrast(90%)' }}
        />
      </div>
      
      {/* Flower decoration - top right corner */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60 scale-x-[-1] scale-y-[-1]"
          priority={false}
          style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(8%) saturate(1000%) hue-rotate(100deg) brightness(95%) contrast(90%)' }}
        />
      </div>
      
      {/* Flower decoration - left bottom corner */}
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60"
          priority={false}
          style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(8%) saturate(1000%) hue-rotate(100deg) brightness(95%) contrast(90%)' }}
        />
      </div>
      
      {/* Flower decoration - right bottom corner */}
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-60 scale-x-[-1]"
          priority={false}
          style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(8%) saturate(1000%) hue-rotate(100deg) brightness(95%) contrast(90%)' }}
        />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#606C60]/60" />
            <div className="w-1.5 h-1.5 bg-[#606C60]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#606C60]/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#606C60]/80 rounded-full" />
            <div className="w-8 sm:w-12 md:w-16 h-px bg-[#606C60]/60" />
          </div>
          
          <h1
            className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#606C60] mb-2 sm:mb-3 md:mb-4`}
          >
            Our Love Story Gallery
          </h1>
          <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg text-[#606C60] font-light max-w-xl mx-auto leading-relaxed px-2`}>
            Every photograph tells a story of {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}'s journey to forever
          </p>
          
          {/* Decorative element below subtitle */}
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-[#606C60]/80 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#606C60]/60 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#606C60]/80 rounded-full" />
          </div>
        </div>

        {images.length === 0 ? (
          <div className={`${cormorant.className} text-center text-[#606C60]/90`}>
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-[#606C60]/80 rounded border border-[#606C60]/30 text-[#606C60]">
                public/mobile-background or public/desktop-background
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}


      </section>
    </main>
  )
}


