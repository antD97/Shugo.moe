import { clientLogIn, clientRegister } from "@/lib/auth/auth-helpers"
import { validateEmail, validatePassword, validateUsername } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { useImmer } from "use-immer"

type FormState = {
  type: "ready"
  errors: string[]
} | {
  type: "loading"
} | {
  type: "success"
}

const useLoginForm = ({
  email,
  username,
  password,
  confirmPassword,
}: {
  email: string
  username: string
  password: string
  confirmPassword: string
}) => {
  const router = useRouter()
  const [mode, setMode] = useImmer<"login" | "register">("login")
  const [formState, setFormState] = useImmer<FormState>({ type: "ready", errors: [] })
  const [altchaPayload, setAltchaPayload] = useImmer <string | null>(null)

  const setModeAndClear = useCallback((m: typeof mode) => {
    if (m !== mode) {
      setFormState({ type: "ready", errors: [] })
      setMode(m)
    }
  }, [mode, setFormState, setMode])

  const formAction = useCallback(async () => {
    // login
    if (mode === "login") {
      setFormState({ type: "loading" })

      const { error } = await clientLogIn(email, password)

      if (!error) {
        setFormState({ type: "success" })
        router.push("/dashboard")
      }
      else {
        setFormState({ type: "ready", errors: [error.message ?? "Unknown server error."] })
      }
    }

    // register
    else {
      const errors = [
        validateEmail(email),
        validateUsername(username),
        validatePassword(password),
        confirmPassword !== password ? "Passwords do not match." : null,
      ].filter(e => e !== null)

      if (errors.length > 0) {
        setFormState({ type: "ready", errors })
        return
      }

      if (!altchaPayload) {
        setFormState({ type: "ready", errors: ["Please complete the CAPTCHA."] })
        return
      }

      setFormState(() => ({ type: "loading" }))
      const { error } = await clientRegister(email, username, password, altchaPayload)

      if (!error) {
        setFormState({ type: "success" })
        router.push("/dashboard")
      }
      else {
        setFormState({ type: "ready", errors: [error.message ?? "Unknown server error."] })
      }
    }
  }, [altchaPayload, confirmPassword, email, mode, password, router, setFormState, username])

  return { mode, setMode: setModeAndClear, formState, setAltchaPayload, formAction }
}

export { useLoginForm }
