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
    <header className="pb-7 lg:pb-10">
      <picture className="absolute -z-10">
        <source media="(max-width: 640px)" srcSet={mobileImages[theme]} />
        <img src={desktopImages[theme]} alt="Header background image" />
      </picture>
      <div className="pt-11 lg:pt-[4.75rem] px-6 flex justify-between max-w-[589px] mx-auto">
        <h1 className="tracking-[0.45rem] md:tracking-[1.15rem] text-3xl md:text-4xl font-bold text-white">
          TODO
        </h1>
        <button className="theme-switcher" onClick={toggleTheme}>
          <img src={isDarkMode ? IconSun : IconMoon} className="w-5 md:w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
