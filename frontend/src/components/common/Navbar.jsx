import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlignJustify, X } from "lucide-react";
import { NavbarLogo, DesktopNavbar, NavbarBurgerMenu } from ".";

export default function Navbar() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <nav className="z-3 min-h-22 border-b-1 sticky top-0 flex min-w-full items-center justify-around border-black bg-white shadow-2xl">
      <NavbarLogo />
      <NavbarBurgerMenu
        isBurgerOpen={isBurgerOpen}
        toggleBurger={() => setIsBurgerOpen(!isBurgerOpen)}
      />
      <DesktopNavbar />
      <Button className="z-1 relative sm:hidden" onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
        {isBurgerOpen ? <X /> : <AlignJustify />}
      </Button>
    </nav>
  );
}
