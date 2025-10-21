import { Footer, Loader, Navbar } from "@/components/common";
import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";

export default function Layout() {
  const { pathname, key } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<Loader />} key={key}>
      <Navbar />
      <Outlet />
      <Footer />
    </Suspense>
  );
}
