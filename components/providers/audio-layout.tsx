"use client"

import { type ReactNode } from "react"
import { AudioProvider } from "@/contexts/audio-context"
import BackgroundMusic from "@/components/background-music"

/** Wraps the app with audio context and background music so music continues across route changes (e.g. home → /gallery). */
export function AudioLayout({ children }: { children: ReactNode }) {
  const enableDecor = process.env.NEXT_PUBLIC_ENABLE_DECOR !== "false"

  return (
    <AudioProvider>
      {enableDecor && <BackgroundMusic />}
      {children}
    </AudioProvider>
  )
}
