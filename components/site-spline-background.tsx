"use client"

import { SPLINE_EMBED_URL } from "@/lib/spline-scene"

/**
 * Published Spline viewer in an iframe (same approach as Spline “embed” on the web).
 * Do not use loading="lazy" — fixed backgrounds are often deferred and may never load.
 */
export default function SiteSplineBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <iframe
        title="Spline background"
        src={SPLINE_EMBED_URL}
        className="absolute left-1/2 top-1/2 h-[125vh] w-[125vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
