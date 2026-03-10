import { authClient } from "@/lib/auth/auth-client"
import { ALTCHA_PAYLOAD_HEADER } from "@/lib/auth/plugin-altcha"

async function clientLogIn(
  email: string,
  password: string,
  callbackURL: string = "/profile",
) {
  return await authClient.signIn.email({
    email,
    password,
    callbackURL,
  })
}

async function clientRegister(
  email: string,
  username: string,
  password: string,
  altchaPayload: string,
  callbackURL: string = "/profile",
) {
  return await authClient.signUp.email({
    email,
    name: username,
    username,
    password,
    callbackURL,
  }, {
    headers: { [ALTCHA_PAYLOAD_HEADER]: altchaPayload ?? "" },
  })
}

export { clientLogIn, clientRegister }
