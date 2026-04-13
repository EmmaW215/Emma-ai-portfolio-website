"use client"

import { useEffect, useState } from "react"
import { SPLINE_EMBED_URL } from "@/lib/spline-scene"

/**
 * Uses Spline’s published viewer in an iframe.
 * The @splinetool/react-spline runtime fetches .splinecode from your page origin and
 * does not work with my.spline.design publish URLs (CORS + wrong resource type).
 */
export default function SiteSplineBackground() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  if (reduceMotion) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <iframe
        title="Spline background"
        src={SPLINE_EMBED_URL}
        loading="lazy"
        className="absolute left-1/2 top-1/2 h-[min(140vh,160%)] w-[min(160vw,200%)] max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; fullscreen"
      />
    </div>
  )
}
