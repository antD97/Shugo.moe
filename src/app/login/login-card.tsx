"use client"

import { useLoginForm } from "@/app/login/use-login-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { H1 } from "@/components/ui/header"
import { ArrowLeftIcon, LoginIcon, MailExclamationIcon, MailIcon, UserPlusIcon } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useId } from "react"
import { useImmer } from "use-immer"

const AltchaWidget = dynamic(() => import("@/components/altcha-widget"), { ssr: false })

const LoginCard = () => {
  const router = useRouter()

  const [email, setEmail] = useImmer("")
  const [displayAltcha, setDisplayAltcha] = useImmer(false)
  const [altchaPayload, setAltchaPayload] = useImmer <string | null>(null)

  const emailId = useId()

  const { formState, loginFormAction, registerFormAction } = useLoginForm(email, altchaPayload)

  return (
    <div className="space-y-3">
      {formState.type === "ready" && (
        <Button onClick={() => router.back()} disabled={formState.type !== "ready"}>
          <ArrowLeftIcon />
          Back
        </Button>
      )}
      <Card className="w-full max-w-sm">
        <CardHeader className="gap-0">
          <CardTitle>
            <H1 className="text-3xl">
              Shugo
              <span className="text-xl text-primary-text">
                .moe
              </span>
            </H1>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(formState.type === "success-login" || formState.type === "success-register")
            ? (
                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="flex items-center px-2">
                    <MailExclamationIcon className="size-6 text-primary-text" />
                  </div>
                  <div className="space-y-2">
                    <p>
                      A
                      {" "}
                      {formState.type === "success-login" ? "login" : "registration"}
                      {" "}
                      link has been sent to your email address. Please check your inbox to continue.
                    </p>
                    <p>
                      You may close this tab.
                    </p>
                  </div>
                </div>
              )
            : (
                <>
                  <p className="text-muted-foreground">
                    You&apos;ll receive a link via email to complete the process.
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      void loginFormAction()
                    }}
                  >
                    <fieldset disabled={formState.type !== "ready"} className="space-y-4 border-none p-0 m-0">
                      <Field>
                        <FieldLabel htmlFor={emailId}>
                          <MailIcon className="translate-y-[-2px]" />
                          Email
                        </FieldLabel>
                        <Input
                          id={emailId}
                          type="email"
                          placeholder="Email..."
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full"
                        />
                      </Field>
                      <div className="grid grid-cols-[1fr_auto] gap-4 pt-2 items-center">
                        {displayAltcha
                          ? (<div><AltchaWidget setAltchaPayload={setAltchaPayload} /></div>)
                          : (<div />)}
                        <div className={cn("grid gap-2", displayAltcha ? "grid-rows-2" : "grid-cols-2")}>
                          <Button
                            type="button"
                            onClick={() => {
                              if (!displayAltcha) setDisplayAltcha(true)
                              else registerFormAction()
                            }}
                            variant="outline"
                            isLoading={formState.type !== "ready"}
                            className="relative"
                          >
                            <UserPlusIcon />
                            Register
                          </Button>
                          <Button
                            type="submit"
                            isLoading={formState.type !== "ready"}
                            className="relative"
                          >
                            <LoginIcon />
                            Log In
                          </Button>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </>
              )}
        </CardContent>
        {formState.type === "ready" && formState.errors.length > 0 && (
          <CardFooter className="flex flex-col gap-4 items-start border-t bg-muted -mb-6 pb-6">
            {formState.errors.map((error, i) => (
              <div key={i} className="text-destructive">{error}</div>
            ))}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
export { LoginCard }
