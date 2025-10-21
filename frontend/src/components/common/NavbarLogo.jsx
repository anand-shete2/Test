import { NavLink } from "react-router";
import logo from "@/assets/logo.png";

export default function NavbarLogo() {
  return (
    <NavLink to="/">
      <img src={logo} alt="logo" className="hover:scale-120 h-14 rounded-md transition-transform" />
    </NavLink>
  );
}
