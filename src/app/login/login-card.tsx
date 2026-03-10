"use client"

import { useLoginForm } from "@/app/login/use-login-form"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { H1 } from "@/components/ui/header"
import { ArrowLeftIcon, AsteriskIcon, LabelIcon, LoginIcon, MailIcon } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Link, linkVariants } from "@/components/ui/link"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useId } from "react"
import { useImmer } from "use-immer"

const AltchaWidget = dynamic(() => import("@/components/altcha-widget"), { ssr: false })

const LoginCard = () => {
  const router = useRouter()

  const [email, setEmail] = useImmer<string>("")
  const [username, setUsername] = useImmer<string>("")
  const [password, setPassword] = useImmer<string>("")
  const [confirmPassword, setConfirmPassword] = useImmer<string>("")

  const { mode, setMode, formState, setAltchaPayload, formAction }
    = useLoginForm({ email, username, password, confirmPassword })

  const usernameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const confirmPasswordId = useId()

  return (
    <div className="space-y-4">
      <Button
        onClick={() => router.back()}
        disabled={formState.type !== "ready"}
      >
        <ArrowLeftIcon />
        Back
      </Button>
      <Card>
        <CardHeader className="gap-0">
          <CardTitle>
            <H1 className="text-3xl">
              Shugo
              <span className="text-xl text-primary-text">
                .moe
              </span>
            </H1>
          </CardTitle>
          <CardAction>
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              disabled={formState.type !== "ready"}
              className={cn(linkVariants({ variant: "secondary" }), formState.type !== "ready" && "opacity-50")}
            >
              {mode === "login" ? "Register" : "Log In"}
            </button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {
              mode === "login" ? ("Enter your credentials to log in.") : ("Register a new account.")
            }
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void formAction()
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
                  placeholder="..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="min-w-xs"
                />
              </Field>
              {mode === "register" && (
                <Field>
                  <FieldLabel htmlFor={usernameId}>
                    <LabelIcon className="translate-y-[-2px]" />
                    Username
                  </FieldLabel>
                  <Input
                    id={usernameId}
                    placeholder="..."
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="min-w-xs"
                  />
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor={passwordId}>
                  <AsteriskIcon />
                  Password
                </FieldLabel>
                <Input
                  id={passwordId}
                  type="password"
                  placeholder="..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="min-w-xs"
                />
              </Field>
              {mode === "register" && (
                <Field>
                  <FieldLabel htmlFor={confirmPasswordId}>
                    <AsteriskIcon />
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id={confirmPasswordId}
                    type="password"
                    placeholder="..."
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="min-w-xs"
                  />
                </Field>
              )}
              <div className="grid grid-cols-[1fr_auto] gap-4 pt-2">
                {
                  mode === "register"
                    ? (<AltchaWidget setAltchaPayload={setAltchaPayload} />)
                    : (<div />)
                }
                <Button
                  type="submit"
                  isLoading={formState.type !== "ready"}
                  className="relative"
                >
                  {mode === "login"
                    ? (
                        <>
                          <LoginIcon />
                          {" "}
                          Log In
                        </>
                      )
                    : (
                        <>
                          <LoginIcon />
                          {" "}
                          Register
                        </>
                      )}
                </Button>
              </div>
            </fieldset>
          </form>
        </CardContent>
        {
          (formState.type === "success" || (formState.type === "ready" && formState.errors.length > 0)) && (
            <CardFooter className="flex flex-col gap-4 items-start border-t bg-muted -mb-6 pb-6">
              {
                formState.type === "success" && (
                  <div>
                    Logged in successfully.
                    <br />
                    If you don&apos;t get redirected, click
                    {" "}
                    <Link href="/brofile">here</Link>
                    .
                  </div>
                )
              }
              {
                formState.type === "ready" && formState.errors.map((error, i) => (
                  <div key={i} className="text-destructive">{error}</div>
                ))
              }
            </CardFooter>
          )
        }
        {/* <CardFooter className="flex flex-col gap-2 border-t bg-muted -mb-6 pb-6">
          <p className="self-start">
            Or
            {" "}
            {mode === "login" ? "log in" : "register"}
            {" "}
            with...
          </p>
          <Button className="w-full bg-discord hover:bg-discord/80">
            <DiscordIcon />
            Discord
          </Button>
          <Button className="w-full bg-github hover:bg-github/80">
            <GithubIcon />
            GitHub
          </Button>
          <Button className="w-full bg-gitlab hover:bg-gitlab/80">
            <GitlabIcon />
            GitLab
          </Button>
          <Button className="w-full bg-google hover:bg-google/80">
            <GoogleIcon />
            Google
          </Button>
          <Button className="w-full bg-reddit hover:bg-reddit/80">
            <RedditIcon />
            Reddit
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  )
}

export { LoginCard }
