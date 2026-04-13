"use client"

import { useEffect, useState } from "react"
import Spline from "@splinetool/react-spline"
import { SPLINE_SCENE_URL } from "@/lib/spline-scene"

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
    <div className="pointer-events-none fixed inset-0 z-0 [&_canvas]:block" aria-hidden>
      <Spline scene={SPLINE_SCENE_URL} className="!absolute inset-0 !h-full !w-full" />
    </div>
  )
}
