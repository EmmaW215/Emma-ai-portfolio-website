"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { NeuralParticles } from "@/components/neural-particles"
import SiteSplineBackground from "@/components/site-spline-background"
import { HeroSection } from "@/components/hero-section"
import { AvatarOverlay } from "@/components/avatar-overlay"
import { PortfolioSection } from "@/components/portfolio-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"

type Phase = "waiting" | "playing" | "done"

function wheelShouldStayOnVerticalPanel(e: WheelEvent, vertical: HTMLElement): boolean {
  if (!vertical.contains(e.target as Node)) return false
  if (vertical.scrollHeight <= vertical.clientHeight + 1) return false
  const atTop = vertical.scrollTop <= 0
  const atBottom = vertical.scrollTop + vertical.clientHeight >= vertical.scrollHeight - 1
  if (e.deltaY < 0 && !atTop) return true
  if (e.deltaY > 0 && !atBottom) return true
  return false
}

export default function Page() {
  const [phase, setPhase] = useState<Phase>("waiting")
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLElement>(null)

  const voiceDoneRef = useRef(false)
  const videoDoneRef = useRef(false)

  const tryFinish = useCallback(() => {
    if (voiceDoneRef.current && videoDoneRef.current) {
      setHasPlayedOnce(true)
      setPhase("done")
      setTimeout(() => {
        const scroller = scrollRef.current
        const target = portfolioRef.current
        if (scroller && target) {
          scroller.scrollTo({ left: target.offsetLeft, behavior: "smooth" })
        }
      }, 600)

      setTimeout(() => {
        voiceDoneRef.current = false
        videoDoneRef.current = false
        setPhase("waiting")
      }, 3000)
    }
  }, [])

  const handleStart = useCallback(() => {
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

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const vertical = portfolioRef.current
      if (vertical && wheelShouldStayOnVerticalPanel(e, vertical)) return

      const { scrollLeft, scrollWidth, clientWidth } = el
      const max = Math.max(0, scrollWidth - clientWidth)
      const next = scrollLeft + e.deltaY
      if (max <= 0) return
      if ((e.deltaY > 0 && scrollLeft < max) || (e.deltaY < 0 && scrollLeft > 0)) {
        e.preventDefault()
        el.scrollLeft = Math.max(0, Math.min(max, next))
      }
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  return (
    <>
      {/* Body already provides bg-background; Spline sits above it once loaded */}
      <SiteSplineBackground />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-background/8"
        aria-hidden
      />
      <NeuralParticles />

      <main
        ref={scrollRef}
        className="relative z-10 h-screen w-screen overflow-x-auto overflow-y-hidden overscroll-x-contain"
        aria-label="Emma portfolio"
      >
        <div className="flex h-full w-max flex-row">
          <div className="relative h-full w-screen shrink-0 bg-transparent">
            <div className="relative h-full w-full">
              <HeroSection
                phase={phase}
                onStart={handleStart}
                onVoiceDone={handleVoiceDone}
              />
              <AvatarOverlay phase={phase} onVideoCycleEnd={handleVideoCycleEnd} />
            </div>
          </div>

          <div
            ref={portfolioRef}
            className="relative h-full w-screen shrink-0 overflow-x-hidden overflow-y-auto bg-background/50 backdrop-blur-md"
          >
            <PortfolioSection isRevealed={hasPlayedOnce} />
            <Footer />
          </div>
        </div>
      </main>

      <ThemeToggle />
    </>
  )
}
