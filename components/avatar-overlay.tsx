"use client"

import { useRef, useEffect } from "react"

interface AvatarOverlayProps {
  phase: "waiting" | "playing" | "done"
  onVideoCycleEnd: () => void
}

const VIDEO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Firefly%20In%20the%20picture%2C%20the%20lady%20in%20red%20naturally%20extends%20her%20right%20hand%20and%20turns%20to%20her%20right%20side-723iIesdqEUpIfXGJIPgaZKB9BX0E9.mp4"

export function AvatarOverlay({ phase, onVideoCycleEnd }: AvatarOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const onVideoCycleEndRef = useRef(onVideoCycleEnd)
  onVideoCycleEndRef.current = onVideoCycleEnd

  // Play video when phase transitions to "playing"
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (phase === "playing") {
      video.loop = false
      video.currentTime = 0
      video.play().catch(() => {
        setTimeout(() => onVideoCycleEndRef.current(), 8000)
      })
    }

    if (phase === "done") {
      video.pause()
    }
  }, [phase])

  // Listen for the video to end (one cycle)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      onVideoCycleEndRef.current()
    }

    video.addEventListener("ended", handleEnded)
    return () => video.removeEventListener("ended", handleEnded)
  }, [])

  // When phase resets to "waiting" (re-click), reset video to start
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (phase === "waiting") {
      video.currentTime = 0
    }
  }, [phase])

  const isDone = phase === "done"

  return (
    <div
      className={`absolute top-1/2 right-0 -translate-y-1/2 z-20 pointer-events-none transition-opacity duration-1000 ease-in-out ${
        isDone ? "opacity-0" : "opacity-100"
      }`}
      aria-label="Digital avatar"
    >
      {/* Large avatar container -- right side, vertically centered to sync with title */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "clamp(320px, 42vw, 640px)",
          height: "clamp(420px, 58vh, 800px)",
        }}
      >
        {/* Video: radial mask — tune ellipse / stops in style below */}
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="h-full w-full object-cover object-top"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 72% 64% at 63% 38%, #fff 64%, rgba(255,255,255,0.4) 66%, rgba(255,255,255,0.06) 72%, rgba(255,255,255,0) 100%)",
            maskImage:
              "radial-gradient(ellipse 72% 64% at 63% 38%, #fff 64%, rgba(255,255,255,0.4) 66%, rgba(255,255,255,0.06) 72%, rgba(255,255,255,0) 100%)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />

        {/* Subtle border glow when playing */}
        {phase === "playing" && (
          <div
            className="absolute inset-0 animate-pulse-glow pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  )
}
