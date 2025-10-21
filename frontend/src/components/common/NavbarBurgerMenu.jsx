import { useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function NavbarBurgerMenu({ isBurgerOpen, toggleBurger }) {
  const user = useSelector(user => user.user);

  return (
    <div
      className={`${isBurgerOpen ? "translate-x-0" : "-translate-x-500"} z-1 fixed top-0 flex h-screen w-screen flex-col items-center justify-center space-y-10 bg-neutral-300 transition-transform *:rounded-md *:bg-neutral-800 *:px-10 *:py-2 *:text-white`}
    >
      {user._id ? (
        <>
          <NavLink to="/" onClick={toggleBurger}>
            Home
          </NavLink>
          <NavLink to="/dashboard" onClick={toggleBurger}>
            Dashboard
          </NavLink>
          <NavLink to="/blog/add" onClick={toggleBurger}>
            Add Blog
          </NavLink>
          <NavLink to="/logout" onClick={toggleBurger}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/signup" onClick={toggleBurger}>
            Sign Up
          </NavLink>
          <NavLink to="/login" onClick={toggleBurger}>
            Login
          </NavLink>
        </>
      )}
    </div>
  );
}
