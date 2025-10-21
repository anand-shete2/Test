import { Github } from "lucide-react";
import { Link } from "react-router";

const FooterSection = () => (
  <footer className="bg-neutral-900 px-4 py-12 text-white">
    <div className="mx-auto max-w-6xl">
      <div className="mx-10 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-6">
          <h3 className="min-w-full text-2xl font-bold">Blogify</h3>
          <p className="mt-1 text-gray-400">Modern blogging made simple</p>
        </div>

        <div className="my-10 flex flex-col gap-6 *:text-neutral-300 *:hover:text-white sm:flex-row sm:gap-8">
          <Link
            to="https://github.com/anand-shete/Blogify"
            className="flex items-center gap-2 transition-colors"
            target="_blank"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <Link to="/privacy-policy" className="transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-800 pt-8 text-center">
        <p className="text-sm text-gray-400">© 2025 Blogify. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
