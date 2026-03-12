import { authClient } from "@/lib/auth/auth-client"
import { ALTCHA_PAYLOAD_HEADER } from "@/lib/constants"
import { useCallback } from "react"
import { useImmer } from "use-immer"

type FormState = {
  type: "ready"
  errors: string[]
} | {
  type: "loading"
} | {
  type: "success-login"
} | {
  type: "success-register"
}

const useEmailLoginForm = (
  email: string,
  altchaState: string | null,
  altchaPayload: string | null,
) => {
  const [formState, setFormState] = useImmer<FormState>({ type: "ready", errors: [] })

  const loginFormAction = useCallback(async () => {
    if (altchaState !== "verified") setFormState({ type: "ready", errors: ["Missing CAPTCHA."] })

    setFormState({ type: "loading" })
    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL: "/profile",
      errorCallbackURL: "/error",
    }, {
      headers: { [ALTCHA_PAYLOAD_HEADER]: altchaPayload ?? "" },
    })

    if (error) setFormState({ type: "ready", errors: [error.message ?? "Unknown server error."] })
    else setFormState({ type: "success-login" })
  }, [altchaState, setFormState, email, altchaPayload])

  return { formState, setFormState, emailLoginFormAction: loginFormAction }
}

export { useEmailLoginForm }
