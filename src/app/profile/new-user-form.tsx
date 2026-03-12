"use client"

import { useNewUserForm } from "@/app/profile/use-new-user-form"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import { H2 } from "@/components/ui/header"
import { AlertIcon, CheckIcon, HomeIcon, LabelIcon, XIcon } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Link } from "@/components/ui/link"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useEffect, useId } from "react"
import { useImmer } from "use-immer"

const NewUserForm = () => {
  const usernameId = useId()
  const router = useRouter()
  const [username, setUsername] = useImmer("")

  const { formState, checkingUsername, usernameOk, usernameError, submitAction } = useNewUserForm(username)

  useEffect(() => {
    if (formState.type === "success") router.refresh()
  }, [formState.type, router])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="space-y-3">
        <Link href="/" variant="no-style" className={buttonVariants()}>
          <HomeIcon />
          Home
        </Link>
        <Card className="w-screen max-w-md">
          <CardHeader>
            <CardTitle>
              <H2 className="text-3xl">
                <span className="text-primary-text">New</span>
                {" "}
                Account
              </H2>
              <Separator />
            </CardTitle>
            <CardDescription className="space-y-4">
              Enter a username for your new account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void submitAction()
              }}
            >
              <fieldset className="space-y-4" disabled={formState.type !== "ready"}>
                <Field>
                  <FieldLabel htmlFor={usernameId}>
                    <LabelIcon />
                    Username
                  </FieldLabel>
                  <Input
                    id={usernameId}
                    required
                    type="text"
                    placeholder="Username..."
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full"
                  />
                </Field>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>
                    {checkingUsername
                      ? (<div className="text-muted-foreground">Checking username...</div>)
                      : usernameError && (
                        <div className="grid grid-cols-[auto_1fr] gap-2 text-destructive">
                          <div className="flex items-center"><XIcon /></div>
                          <div>{usernameError}</div>
                        </div>
                      )}
                  </div>
                  <Button
                    type="submit"
                    isLoading={formState.type === "loading"}
                    disabled={formState.type !== "ready" || checkingUsername || !usernameOk}
                    className="self-end"
                  >
                    <CheckIcon className="-translate-y-px" />
                    Confirm
                  </Button>
                </div>
              </fieldset>
            </form>
          </CardContent>
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

export { NewUserForm }
