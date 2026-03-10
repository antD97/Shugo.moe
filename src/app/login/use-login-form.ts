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

const useLoginForm = (
  email: string,
  altchaPayload: string | null,
) => {
  const [formState, setFormState] = useImmer<FormState>({ type: "ready", errors: [] })

  const loginFormAction = useCallback(async () => {
    setFormState({ type: "loading" })
    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL: "/profile",
      errorCallbackURL: "/error?d=ml-signin", // TODO
    })

    if (error) setFormState({ type: "ready", errors: [error.message ?? "Unknown server error."] })
    else setFormState({ type: "success-login" })
  }, [email, setFormState])

  const registerFormAction = useCallback(async () => {
    setFormState({ type: "loading" })

    const { error } = await authClient.signIn.magicLink({
      email,
      callbackURL: "/profile",
      errorCallbackURL: "/error?d=ml-register", // TODO
    }, {
      headers: { [ALTCHA_PAYLOAD_HEADER]: altchaPayload ?? "" },
    })

    if (error) setFormState({ type: "ready", errors: [error.message ?? "Unknown server error."] })
    else setFormState({ type: "success-register" })
  }, [altchaPayload, email, setFormState])

  return { formState, loginFormAction, registerFormAction }
}

export { useLoginForm }
