"use client"

import { useState, useRef, useCallback } from "react"
import { NeuralParticles } from "@/components/neural-particles"
import { HeroSection } from "@/components/hero-section"
import { AvatarOverlay } from "@/components/avatar-overlay"
import { PortfolioSection } from "@/components/portfolio-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"

type Phase = "waiting" | "playing" | "done"

export default function Page() {
  const [phase, setPhase] = useState<Phase>("waiting")
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
  const portfolioRef = useRef<HTMLDivElement>(null)

  // Track completion of both voice and video independently
  const voiceDoneRef = useRef(false)
  const videoDoneRef = useRef(false)

  const tryFinish = useCallback(() => {
    if (voiceDoneRef.current && videoDoneRef.current) {
      setHasPlayedOnce(true)
      setPhase("done")
      // Auto-scroll to portfolio after a short reveal delay
      setTimeout(() => {
        portfolioRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 600)

      // After scrolling completes, reset phase to "waiting" so button is re-clickable
      setTimeout(() => {
        voiceDoneRef.current = false
        videoDoneRef.current = false
        setPhase("waiting")
      }, 3000)
    }
  }, [])

  const handleStart = useCallback(() => {
    // Reset completion flags for this new cycle
    voiceDoneRef.current = false
    videoDoneRef.current = false
    setPhase("playing")
  }, [])

  const handleVoiceDone = useCallback(() => {
    voiceDoneRef.current = true
    tryFinish()
  }, [tryFinish])

  const handleVideoCycleEnd = useCallback(() => {
    videoDoneRef.current = true
    tryFinish()
  }, [tryFinish])

  return (
    <main className="relative min-h-screen bg-background">
      <NeuralParticles />
      <ThemeToggle />

      {/* Hero: full-screen intro with voice + subtitles + avatar in same section */}
      <div className="relative">
        <HeroSection
          phase={phase}
          onStart={handleStart}
          onVoiceDone={handleVoiceDone}
        />
        {/* Avatar positioned inside the hero section, right side, vertically synced with title */}
        <AvatarOverlay
          phase={phase}
          onVideoCycleEnd={handleVideoCycleEnd}
        />
      </div>

      {/* Portfolio: scrolls up to replace hero once done */}
      <div ref={portfolioRef}>
        <PortfolioSection isRevealed={hasPlayedOnce} />
        <Footer />
      </div>
    </main>
  )
}
