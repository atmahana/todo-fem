import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "../ThemeContext";

export default function SignUpPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen grid place-content-center">
      <SignUp
        path="/sign-up"
        redirectUrl="/"
        afterSignUpUrl="/"
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          elements: {
            card: "bg-foreground",
            formButtonPrimary: "bg-primary rounded-md",
            footerActionLink: "text-primary",
            formFieldInput: "rounded-md bg-background border-muted",
            otpCodeFieldInput: "rounded-md bg-background border-muted",
          },
        }}
      />
    </div>
  );
}
