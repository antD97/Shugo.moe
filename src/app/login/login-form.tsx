"use client"

import { useEmailLoginForm } from "@/app/login/use-login-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { H2 } from "@/components/ui/header"
import { AlertIcon, BigLeftArrow, KeyIcon, MailIcon, MailSend, MailSent } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useId } from "react"
import { useImmer } from "use-immer"

const AltchaWidget = dynamic(() => import("@/components/altcha-widget"), { ssr: false })

const LoginForm = () => {
  const router = useRouter()

  const [email, setEmail] = useImmer("")
  const [altchaState, setAltchaState] = useImmer<string | null>(null)
  const [altchaPayload, setAltchaPayload] = useImmer<string | null>(null)

  const emailId = useId()

  const { formState, setFormState, emailLoginFormAction } = useEmailLoginForm(email, altchaState, altchaPayload)

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="space-y-3">
        <Button
          type="button"
          onClick={() => {
            if (formState.type === "ready") router.back()
            if (formState.type === "success-login" || formState.type === "success-register") {
              setEmail("")
              setFormState({ type: "ready", errors: [] })
            }
          }}
          disabled={formState.type === "loading"}
        >
          <BigLeftArrow />
          Back
        </Button>
        <Card className="w-screen max-w-sm">
          <CardHeader>
            {/* <CardTitle>
              <H2 className="text-3xl">
                Shugo
                <span className="text-xl text-primary-text">
                  .moe
                </span>
              </H2>
            </CardTitle> */}

            {formState.type === "ready" && (
              <>
                <CardTitle>
                  <H2 className="text-3xl">
                    <span className="text-primary-text">Login</span>
                    /Register
                  </H2>
                  <Separator className="mb-2" />
                </CardTitle>
                <CardDescription className="space-y-4">
                  <p>
                    To login or register, enter your email below. You will receive a link to complete the process.
                    {/* To
                  {" "}
                  <span className="text-foreground">log in</span>
                  {" "}
                  or
                  {" "}
                  <span className="text-foreground">register</span>
                  , enter your email. You will receive a link to complete the process. */}
                  </p>
                  <p>Alternatively, log in with a passkey.</p>
                </CardDescription>
              </>
            )}
            {(formState.type === "success-login" || formState.type === "success-register") && (
              <>
                <CardTitle>
                  <H2 className="text-3xl">
                    <span className="text-primary-text">Email</span>
                    {" "}
                    Sent
                  </H2>
                  <Separator className="mb-2" />
                </CardTitle>
                <CardDescription className="grid grid-cols-[auto_1fr] gap-2">
                  <div className="flex items-center px-2">
                    {/* <MailSent className="size-6 text-primary-text" /> */}
                    <MailSent className="size-6 text-foreground" />
                  </div>
                  <div className="space-y-4">
                    <p>
                      A
                      {" "}
                      {formState.type === "success-login" ? "login" : "registration"}
                      {" "}
                      link has been sent to your email address.
                      {" "}
                      <span className="text-foreground">You may close this tab.</span>
                    </p>
                  </div>
                </CardDescription>
              </>
            )}
          </CardHeader>
          {(formState.type === "ready" || formState.type === "loading") && (
            <CardContent className="space-y-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  void emailLoginFormAction()
                }}
              >
                <fieldset className="space-y-4" disabled={formState.type !== "ready"}>
                  <Field>
                    <FieldLabel htmlFor={emailId}>
                      <MailIcon className="translate-y-[-2px]" />
                      Email
                    </FieldLabel>
                    <Input
                      id={emailId}
                      required
                      type="email"
                      placeholder="Email..."
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full"
                    />
                  </Field>
                  <div className="grid grid-cols-[1fr_auto] gap-6 items-center">
                    <div>
                      <AltchaWidget setAltchaState={setAltchaState} setAltchaPayload={setAltchaPayload} />
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                      <Button variant="outline">
                        <KeyIcon />
                        Passkey
                      </Button>
                      <Button
                        type="submit"
                        isLoading={formState.type !== "ready"}
                      >
                        <MailSend />
                        Email
                      </Button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </CardContent>
          )}
          {/* <CardContent className="space-y-6">
            {(formState.type === "success-login" || formState.type === "success-register")
              ? (
                  <div className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="flex items-center px-2">
                      <MailSent className="size-6 text-primary-text" />
                    </div>
                    <div className="space-y-4">
                      <p>
                        A
                        {" "}
                        {formState.type === "success-login" ? "login" : "registration"}
                        {" "}
                        link has been sent to your email address. Please check your inbox to continue.
                      </p>
                      <p>
                        You may close this tab at any time.
                      </p>
                    </div>
                  </div>
                )
              : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      void emailLoginFormAction()
                    }}
                  >
                    <fieldset className="space-y-4" disabled={formState.type !== "ready"}>
                      <Field>
                        <FieldLabel htmlFor={emailId}>
                          <MailIcon className="translate-y-[-2px]" />
                          Email
                        </FieldLabel>
                        <Input
                          id={emailId}
                          required
                          type="email"
                          placeholder="Email..."
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full"
                        />
                      </Field>
                      <div className="grid grid-cols-[1fr_auto] gap-6 items-center">
                        <div>
                          <AltchaWidget setAltchaState={setAltchaState} setAltchaPayload={setAltchaPayload} />
                        </div>
                        <div className="grid grid-rows-2 gap-2">
                          <Button variant="outline">
                            <KeyIcon />
                            Passkey
                          </Button>
                          <Button
                            type="submit"
                            isLoading={formState.type !== "ready"}
                          >
                            <MailSend />
                            Email
                          </Button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                )}
          </CardContent> */}
          {formState.type === "ready" && formState.errors.length > 0 && (
            <CardFooter className="flex flex-col gap-4 items-start border-t bg-muted -mb-6 pb-6">
              {formState.errors.map((error, i) => (
                <div key={i} className="text-destructive">
                  <AlertIcon className="size-5 mr-2" />
                  {error}
                </div>
              ))}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
export { LoginForm }
