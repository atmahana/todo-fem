import { FC } from "react";
import { SignInButton, useAuth, UserButton } from "@clerk/clerk-react";
import { useTheme } from "../ThemeContext";
import IconSun from "../assets/icon-sun.svg";
import IconMoon from "../assets/icon-moon.svg";
import IconLogin from "../assets/icon-login.svg";
import BgMobileDark from "../assets/bg-mobile-dark.jpg";
import BgMobileLight from "../assets/bg-mobile-light.jpg";
import BgDesktopDark from "../assets/bg-desktop-dark.jpg";
import BgDesktopLight from "../assets/bg-desktop-light.jpg";
import { dark } from "@clerk/themes";

interface HeaderProps {}

const desktopImages = {
  light: BgDesktopLight,
  dark: BgDesktopDark,
};

const mobileImages = {
  light: BgMobileLight,
  dark: BgMobileDark,
};

const Header: FC<HeaderProps> = () => {
  const { isSignedIn } = useAuth();
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="pb-7 lg:pb-10">
      <picture className="absolute -z-10 w-full">
        <source media="(max-width: 640px)" srcSet={mobileImages[theme]} />
        <img src={desktopImages[theme]} alt="Header background image" className="w-full" />
      </picture>
      <div className="pt-11 lg:pt-[4.75rem] px-6 flex justify-between md:max-w-[589px] 2xl:max-w-[748px] mx-auto">
        <h1 className="tracking-[0.45rem] md:tracking-[1.15rem] text-3xl md:text-4xl font-bold text-white">
          TODO
        </h1>
        <div className="flex items-center gap-2 md:gap-3">
          <button className="focus:ring-2 focus:ring-primary focus-visible:outline outline-2 outline-primary rounded" onClick={toggleTheme} aria-label="Theme Switcher Button">
            <img src={isDarkMode ? IconSun : IconMoon} className="w-6" alt={IconMoon ? "Dark mode icon" : "Light mode icon"}/>
          </button>
          {isSignedIn ? (
            <UserButton appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                card: "bg-foreground",
                formButtonPrimary: "bg-primary rounded-md",
                footerActionLink: "text-primary",
                formFieldInput__identifier: "rounded-md bg-background border-muted",
                userButtonTrigger: "focus:ring-2 focus:ring-primary"
              },
            }}/>
          ) : (
            <SignInButton>
              <button>
                <img src={IconLogin} alt="Login icon" />
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
