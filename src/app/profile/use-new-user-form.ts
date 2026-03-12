import { authClient } from "@/lib/auth/auth-client"
import { usernameSchema } from "@/lib/validation"
import { useCallback, useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"
import { useImmer } from "use-immer"
import { z } from "zod"

type FormState = {
  type: "ready"
  errors: string[]
} | {
  type: "loading"
} | {
  type: "success"
}

const useNewUserForm = (username: string) => {
  const [formState, setFormState] = useImmer<FormState>({
    type: "ready",
    errors: [],
  })

  const [checkingUsername, setCheckingUsername] = useImmer(false)
  const [usernameOk, setUsernameOk] = useImmer(false)
  const [usernameError, setUsernameError] = useImmer<string | null>(null)

  const checkUsername = useDebouncedCallback(async (username: string) => {
    if (username.trim().length !== 0) {
      const validatedUsername = usernameSchema.safeParse(username)

      if (!validatedUsername.error) {
        // const { data, error } = await authClient.checkUsername({ query: { username: validatedUsername.data } })
        const { available, error } = await authClient.checkUsername(username)

        if (!error) {
          setUsernameOk(available)
          setUsernameError(null)
        }

        // server check error
        else {
          setUsernameOk(false)
          setUsernameError(error.message ?? "Error checking username availablity")
        }
      }

      // failed base validation rules
      else {
        setUsernameOk(false)
        setUsernameError(z.treeifyError(validatedUsername.error).errors[0])
      }
    }

    // empty username
    else {
      setUsernameOk(false)
      setUsernameError(null)
    }

    setCheckingUsername(false)
  }, 2000)

  // on username changes
  useEffect(() => {
    if (username.trim().length !== 0) {
      setCheckingUsername(true)
      setUsernameOk(false)
      void checkUsername(username)
    }
    else {
      setCheckingUsername(false)
      setUsernameOk(false)
      setUsernameError(null)
    }
  }, [username, checkUsername, setCheckingUsername, setUsernameOk, setUsernameError])

  const submitAction = useCallback(async () => {
    if (formState.type !== "ready" || checkingUsername || !usernameOk) return

    setFormState({ type: "loading" })

    const { error } = await authClient.changeUsername(username)

    if (!error) setFormState({ type: "success" })
    else {
      setFormState({
        type: "ready",
        errors: [error.message ?? "Unknown server error."],
      })
      return
    }
  }, [checkingUsername, formState.type, setFormState, username, usernameOk])

  return { formState, checkingUsername, usernameOk, usernameError, submitAction }
}

export { useNewUserForm }
