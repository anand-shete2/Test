import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { NavLink } from "react-router";

// renamed to SitePolicy to avoid brave from blocking this component
export default function SitePolicy() {
  return (
    <div className="flex min-w-full items-center justify-center">
      <Card className="lg:my-30 my-20 w-[80vw] py-10 text-center shadow-2xl shadow-black/60 lg:w-[60vw]">
        <CardHeader>
          <CardTitle className="-mb-2 flex flex-row justify-center text-2xl">
            <Info className="relative top-1 mr-1 text-gray-600" />
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="text-black">
          <p>
            We don't collect or share any personal data other than your Google account details used
            for login via OAuth. Your blog content is stored securely in our database and not shared
            with third parties. This project is a personal, non-commercial project created for
            learning purposes only.
          </p>
          <h1 className="mb-2 mt-4 text-lg font-semibold">Content Responsibility:</h1>
          <p>
            Any examples, integrations, or tutorials that involve third-party services (e.g., OAuth
            with Google, Facebook, or other providers) are for educational use only. Blogify does
            not claim ownership, partnership, or endorsement from any third-party organization.
            Users are encouraged to verify implementation details from official documentation before
            using them in production environments.
          </p>
        </CardContent>
        <NavLink to="/">
          <Button>Home</Button>
        </NavLink>
      </Card>
    </div>
  );
}
