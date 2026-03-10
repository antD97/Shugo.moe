"use client"

import "altcha"
import { Updater } from "use-immer"

// MUST BE LOADED WITH:
//  import dynamic from "next/dynamic"
//  const AltchaWidget = dynamic(() => import("@/components/AltchaWrapper"), { ssr: false })

const AltchaWidget = ({ setAltchaPayload }: { setAltchaPayload: Updater<string | null> }) => (
  <altcha-widget
    challengeurl="/api/auth/altcha"
    auto="onload"
    onstatechange={(e) => {
      if (e.detail.state === "verified" && typeof e.detail.payload === "string") {
        setAltchaPayload(e.detail.payload)
      }
      else {
        setAltchaPayload(null)
      }
    }}
  />
)

export default AltchaWidget
