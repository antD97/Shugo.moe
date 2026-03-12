"use client"

import "altcha"
import { Updater } from "use-immer"

// MUST BE LOADED WITH:
//  import dynamic from "next/dynamic"
//  const AltchaWidget = dynamic(() => import("@/components/altcha-widget"), { ssr: false })

const AltchaWidget = ({
  setAltchaState,
  setAltchaPayload,
}: {
  setAltchaState: Updater<string | null>
  setAltchaPayload: Updater<string | null>
}) => (
  <altcha-widget
    challengeurl="/api/auth/altcha"
    auto="onload"
    onstatechange={(e) => {
      const state = e.detail.state

      setAltchaState(typeof state === "string" ? state : null)

      if (state === "verified" && typeof e.detail.payload === "string") {
        setAltchaPayload(e.detail.payload)
      }
      else {
        setAltchaPayload(null)
      }
    }}
  />
)

export default AltchaWidget
