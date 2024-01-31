import { FC } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <nav className="md:max-w-[589px] 2xl:max-w-[748px] mx-auto px-6">
      <ul className="bg-foreground w-full flex justify-center gap-5 rounded-md mt-5 py-3 font-bold shadow-sm text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-muted-foreground hover:text-input"
          }
        >
          All
        </NavLink>
        <NavLink
          to="/active"
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-muted-foreground hover:text-input"
          }
        >
          Active
        </NavLink>
        <NavLink
          to="/completed"
          className={({ isActive }) =>
            isActive ? "text-primary" : "text-muted-foreground hover:text-input"
          }
        >
          Completed
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
