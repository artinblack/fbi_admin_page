"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSession } from "@/lib/auth"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const session = getSession()
    if (!session) {
      router.replace("/")
      return
    }
    setAuthenticated(true)
  }, [router])

  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#042c53" }}
      >
        <div
          className="size-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#C9963A", borderTopColor: "transparent" }}
        />
      </div>
    )
  }

  return <>{children}</>
}
