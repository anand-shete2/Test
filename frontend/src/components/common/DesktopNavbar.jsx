import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Button } from "../ui/button";

export default function DesktopNavbar() {
  const user = useSelector(user => user.user);

  return (
    <div className="[&_a]:hover:scale-120 [&_a]:duration-600 hidden space-x-10 sm:block [&_a]:underline-offset-2 [&_a]:transition-all [&_a]:hover:underline">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>

      {user._id ? (
        <>
          <Link to="/blog/add">Add Blog</Link>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </>
      )}
    </div>
  );
}
