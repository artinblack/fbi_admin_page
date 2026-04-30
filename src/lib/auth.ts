export const GOOGLE_CLIENT_ID =
  "1039260121560-fbk05p7gfbv8b5f3o5vvrcd0vrlf0u8j.apps.googleusercontent.com"

export const ALLOWED_EMAILS = [
  "vikas.usauthentication@gmail.com",
  "aashray.bhagtani@gmail.com",
  "usauthentication@gmail.com",
]

export const SESSION_KEY = "fbi_admin_google_session"

export type SessionUser = {
  email: string
  name: string
  picture: string
}

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null")
  } catch {
    return null
  }
}

export function clearSession() {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(SESSION_KEY)
}
