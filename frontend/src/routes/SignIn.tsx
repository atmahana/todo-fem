import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "../ThemeContext";

export default function SignInPage() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen grid place-content-center">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          elements: {
            card: "bg-foreground",
            formButtonPrimary: "bg-primary rounded-md",
            footerActionLink: "text-primary",
            formFieldInput__identifier: "rounded-md bg-background border-muted",
          },
        }}
      />
    </div>
  );
}
