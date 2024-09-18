import React from "react";

import { cn } from "@/lib/utils";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Icons } from "../../components/icons";
import { useMutation, useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface LoginResponse {
  status: boolean | undefined;
  claims: any[] | undefined;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [formError, setError] = React.useState<string | null>(null);

  const { mutate, error, isLoading, reset, data } = useMutation(
    async (data: any) => {
      const response = await axios.post("/Account/Login", data);
      return response.data;
    }
  );

  //call axios to get loggedin user when the github button is clicked

  const testUser = async () => {
    const response = await axios.get("/Account/GetLoggedInUser");
    console.log(response.data);
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    // Get values from input fields
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Check if email and password are not null
    if (email && password) {
      // Validate email using simple regex pattern
      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailIsValid) {
        setError("Invalid email address");
        return;
      }

      // Validate password length
      const passwordIsValid = password.length >= 8; // change this to your password requirements
      if (!passwordIsValid) {
        setError("Password should be at least 8 characters long");
        return;
      }

      // If both email and password are valid, proceed to login
      mutate({
        userName: email,
        password: password,
      });
    } else {
      setError("Please fill in both email and password");
    }
  }

  const axiosError = error instanceof Error ? error.message : (error as any);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {data?.status === false && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Invalid username or password</AlertDescription>
        </Alert>
      )}
      {axiosError && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{axiosError}</AlertDescription>
        </Alert>
      )}
      {formError && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              ref={emailRef}
              onChange={() => {
                reset();
                setError(null);
              }}
            />
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              ref={passwordRef}
              onChange={() => {
                reset();
                setError(null);
              }}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          testUser();
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
    </div>
  );
}
