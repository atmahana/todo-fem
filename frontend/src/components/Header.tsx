import { FunctionComponent } from "react";
import BgMobileLight from "../assets/bg-mobile-light.jpg";
import BgMobileDark from "../assets/bg-mobile-dark.jpg";
import BgDesktopLight from "../assets/bg-desktop-light.jpg";
import BgDesktopDark from "../assets/bg-desktop-dark.jpg";
import IconSun from "../assets/icon-sun.svg";
import IconMoon from "../assets/icon-moon.svg";
import { useTheme } from "../ThemeContext";

interface HeaderProps {}

const desktopImages = {
  light: BgDesktopLight,
  dark: BgDesktopDark,
};

const mobileImages = {
  light: BgMobileLight,
  dark: BgMobileDark,
};

const Header: FunctionComponent<HeaderProps> = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <header>
      <picture className="absolute -z-10">
        <source media="(max-width: 1280px)" srcSet={mobileImages[theme]} />
        <img src={desktopImages[theme]} alt="Header background image" />
      </picture>
      <div className="pt-11 px-6 flex justify-between">
        <h1 className="tracking-[0.45rem] text-3xl font-bold text-white">
          TODO
        </h1>
        <button className="theme-switcher" onClick={toggleTheme}>
          <img src={isDarkMode ? IconSun : IconMoon} className="w-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
