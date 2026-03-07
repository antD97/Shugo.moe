"use client"

import { Link } from "@/components/ui/link"
import { cn } from "@/lib/utils"
import { ReactNode, useEffect } from "react"
import { useImmer } from "use-immer"

const tipMessages = [
  <>
    <span className="underline">You should tip. Just kidding... Unless?</span>
    {" "}
    👉👈
  </>,
  <>
    <span className="underline">You tip the delivery driver but not little ol&apos; me?</span>
    {" "}
    🥺
  </>,
  <>
    <span className="underline">Tip or the dog gets it.</span>
    {" "}
    🐶🔫😠
  </>,
  <>
    <span className="underline">Spare change?</span>
    {" "}
    🪙
  </>,
]

const Footer = () => {
  const [content, setContent] = useImmer<ReactNode | null>(null)

  useEffect(() => {
    setContent(tipMessages[Math.floor(Math.random() * tipMessages.length)])
  }, [setContent])

  return (
    <footer className="w-full flex flex-col items-center p-2 gap-1 text-sm bg-card">
      <Link href="" className={cn(!content && "text-transparent", "no-underline")}>
        {content ?? "Tip message"}
      </Link>
      <div className="flex gap-4">
        <div>antD © 2022-2025</div>
        |
        <Link href="">Source</Link>
        |
        <Link href="">Legal</Link>
      </div>
    </footer>
  )
}

export { Footer }
