"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface HeroSectionProps {
  phase: "waiting" | "playing" | "done"
  onStart: () => void
  onVoiceDone: () => void
}

const WELCOME_TEXT =
  "Welcome to my personal AI website. Please feel free to click, and to explore and discover my projects."
const SENTENCES = [
  "Welcome to my personal AI website.",
  "Please feel free to click, and to explore and discover my projects.",
]

export function HeroSection({ phase, onStart, onVoiceDone }: HeroSectionProps) {
  const [showContent, setShowContent] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [currentSentence, setCurrentSentence] = useState(0)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)

  const onVoiceDoneRef = useRef(onVoiceDone)
  onVoiceDoneRef.current = onVoiceDone
  const onStartRef = useRef(onStart)
  onStartRef.current = onStart
  const sentenceTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout>>()

  // Preload speech synthesis voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    speechSynthesis.getVoices()
    const handleVoicesChanged = () => speechSynthesis.getVoices()
    speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged)
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged)
    }
  }, [])

  // Initial mount animation
  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 300)
    const t2 = setTimeout(() => setShowButton(true), 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        speechSynthesis.cancel()
      }
      if (sentenceTimerRef.current) clearTimeout(sentenceTimerRef.current)
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
    }
  }, [])

  const startPlayback = useCallback(() => {
    // Cancel any ongoing speech
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
    if (sentenceTimerRef.current) clearTimeout(sentenceTimerRef.current)
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)

    // Start TTS
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(WELCOME_TEXT)
      utterance.rate = 0.85
      utterance.pitch = 1.05
      utterance.volume = 1

      const voices = speechSynthesis.getVoices()
      const preferredVoice =
        voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            v.name.toLowerCase().includes("female")
        ) || voices.find((v) => v.lang.startsWith("en"))
      if (preferredVoice) utterance.voice = preferredVoice

      utterance.onend = () => {
        if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
        onVoiceDoneRef.current()
      }

      utterance.onerror = () => {
        if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
        onVoiceDoneRef.current()
      }

      speechSynthesis.speak(utterance)

      fallbackTimerRef.current = setTimeout(() => {
        onVoiceDoneRef.current()
      }, 15000)
    } else {
      fallbackTimerRef.current = setTimeout(() => {
        onVoiceDoneRef.current()
      }, 6000)
    }

    // Show subtitles and switch sentence midway
    setShowSubtitle(true)
    setCurrentSentence(0)
    sentenceTimerRef.current = setTimeout(() => setCurrentSentence(1), 3500)

    // Notify parent to change phase to "playing"
    onStartRef.current()
  }, [])

  // Auto-play on first mount after a brief delay
  useEffect(() => {
    if (hasAutoPlayed) return
    const timer = setTimeout(() => {
      setHasAutoPlayed(true)
      startPlayback()
    }, 1500)
    return () => clearTimeout(timer)
  }, [hasAutoPlayed, startPlayback])

  // When phase resets to "waiting" (after a re-click cycle), hide subtitles
  useEffect(() => {
    if (phase === "waiting") {
      setShowSubtitle(false)
      setCurrentSentence(0)
    }
  }, [phase])

  const handleEnterClick = () => {
    // If already playing, ignore
    if (phase === "playing") return
    startPlayback()
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero introduction"
    >
      {/* Metallic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(180,190,210,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(180,190,210,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Ambient light beams */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px]"
        aria-hidden="true"
      />

      {/* Title content -- positioned left, vertically centered, synced with avatar on right */}
      <div className="absolute top-1/2 left-8 lg:left-16 -translate-y-1/2 z-10 max-w-xl">
        <div
          className={`transition-all duration-1000 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-accent font-heading text-base md:text-lg tracking-[0.3em] uppercase mb-4 font-bold">
            Digital Mind Studio
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-4 text-balance">
            {"Emma's AI ProtoVerse"}
          </h1>
          <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-md">
            From Vision to Intelligence
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-12 bg-accent/60" />
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <div className="h-px w-24 bg-border" />
          </div>
        </div>

        {/* "Enter My World" button - ALWAYS visible, re-clickable */}
        <div
          className={`mt-12 transition-all duration-700 ${
            showButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={handleEnterClick}
            disabled={phase === "playing"}
            className="group relative flex items-center gap-4 px-8 py-4 rounded-full border border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent/50 transition-all duration-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Enter the AI world and start the experience"
          >
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent/40 animate-ping" />
            </div>
            <span className="text-foreground text-sm tracking-widest uppercase font-medium group-hover:text-accent transition-colors">
              Enter My World
            </span>
          </button>
        </div>

        {/* Subtitles - during playing phase */}
        {showSubtitle && phase === "playing" && (
          <div className="mt-8 animate-fade-in">
            <div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-lg px-5 py-3 max-w-md">
              <p
                key={currentSentence}
                className="text-foreground/90 text-sm leading-relaxed italic animate-fade-in"
              >
                {`"${SENTENCES[currentSentence]}"`}
              </p>
            </div>
          </div>
        )}

        {/* Audio waveform indicator - during playing phase */}
        {phase === "playing" && (
          <div className="mt-6 flex items-center gap-3 animate-fade-in">
            <div className="flex items-end gap-[3px] h-4" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-full bg-accent"
                  style={{
                    animation: `audioBar 0.6s ease-in-out ${i * 0.12}s infinite alternate`,
                  }}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-xs tracking-wider uppercase">
              Speaking...
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
