"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import Image from "next/image"
import {
  GOOGLE_CLIENT_ID,
  ALLOWED_EMAILS,
  SESSION_KEY,
  getSession,
} from "@/lib/auth"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { google: any }
}

function decodeJwt(token: string): Record<string, string> {
  const payload = token.split(".")[1]
  return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [scriptReady, setScriptReady] = useState(false)
  const initialized = useRef(false)

  // Redirect immediately if already authenticated
  useEffect(() => {
    if (getSession()) router.replace("/dashboard")
  }, [router])

  const initGoogleAuth = useCallback(() => {
    if (!window.google || initialized.current) return
    initialized.current = true

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      auto_select: false,
      callback: (response: { credential: string }) => {
        try {
          const payload = decodeJwt(response.credential)
          const email = (payload.email ?? "").toLowerCase().trim()

          if (!ALLOWED_EMAILS.map((e) => e.toLowerCase()).includes(email)) {
            setError(`Access denied — ${email} is not an authorised admin account.`)
            return
          }

          sessionStorage.setItem(
            SESSION_KEY,
            JSON.stringify({ email, name: payload.name, picture: payload.picture })
          )
          router.push("/dashboard")
        } catch {
          setError("Sign-in failed — please try again.")
        }
      },
    })

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      { theme: "outline", size: "large", width: 280, text: "signin_with" }
    )
  }, [router])

  useEffect(() => {
    if (scriptReady) initGoogleAuth()
  }, [scriptReady, initGoogleAuth])

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => setError("Google Sign-In failed to load. Check your internet connection.")}
      />

      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "#042c53" }}
      >
        <div
          className="bg-white rounded-2xl w-full max-w-[380px] text-center"
          style={{
            padding: "2.5rem 2rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <Image
              src="/logo.jpeg"
              alt="FBI Apostille"
              width={44}
              height={44}
              className="object-contain rounded-md shrink-0"
            />
            <div className="text-left">
              <div
                className="text-[13px] font-bold leading-snug"
                style={{ color: "#042c53" }}
              >
                FBI APOSTILLE
              </div>
              <div className="text-[10.5px]" style={{ color: "#6b7694" }}>
                Admin Panel
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-[1.4rem] mb-1 leading-snug"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              color: "#042c53",
            }}
          >
            Admin Sign-In
          </h1>
          <p
            className="text-[12.5px] leading-relaxed mb-7"
            style={{ color: "#6b7694" }}
          >
            Sign in with your Google account to access the admin dashboard.
          </p>

          {/* Google button rendered by GSI */}
          <div className="flex justify-center mt-1">
            <div id="google-signin-btn" />
          </div>

          {/* Error */}
          <p
            className="text-[12px] mt-3 min-h-4 leading-relaxed"
            style={{ color: "#d94040" }}
          >
            {error}
          </p>

          {/* Footer note */}
          <p
            className="text-[11px] text-center mt-5 leading-relaxed"
            style={{ color: "#6b7694" }}
          >
            Access is restricted to authorised accounts only.
          </p>
        </div>
      </div>
    </>
  )
}
