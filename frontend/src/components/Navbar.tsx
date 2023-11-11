import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  return (
    <nav className="max-w-[589px] mx-auto px-6">
      <ul className="bg-foreground w-full flex justify-center gap-5 rounded-md mt-5 py-3 font-bold shadow-lg text-sm">
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
