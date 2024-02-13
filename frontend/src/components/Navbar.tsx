import { FC } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <nav className="md:max-w-[589px] 2xl:max-w-[748px] mx-auto px-6">
      <ul className="bg-foreground w-full flex justify-center gap-5 rounded-md mt-5 py-3 font-bold shadow-sm text-sm md:text-base">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary focus-visible:outline outline-2 outline-input rounded"
                : "text-muted-foreground hover:text-input focus-visible:outline outline-2 outline-primary rounded"
            }
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/active"
            className={({ isActive }) =>
              isActive
                ? "text-primary focus-visible:outline outline-2 outline-input rounded"
                : "text-muted-foreground hover:text-input focus-visible:outline outline-2 outline-primary rounded"
            }
          >
            Active
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              isActive
                ? "text-primary focus-visible:outline outline-2 outline-input rounded"
                : "text-muted-foreground hover:text-input focus-visible:outline outline-2 outline-primary rounded"
            }
          >
            Completed
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
