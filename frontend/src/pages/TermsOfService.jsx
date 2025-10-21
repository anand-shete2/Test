import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { NavLink } from "react-router";

export default function TermsOfService() {
  return (
    <div className="flex min-w-full items-center justify-center">
      <Card className="lg:my-30 my-20 w-[80vw] py-10 text-center shadow-2xl shadow-black/60 lg:w-[60vw]">
        <CardHeader>
          <CardTitle className="-mb-2 flex flex-row justify-center text-2xl">
            <ShieldAlert className="relative top-1 mr-1 text-gray-600" />
            <span>Terms Of Service</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-black">
          <p>
            Blogify is a free platform built for educational and hobby purposes. By using this
            website, you agree to not misuse the platform or engage in harmful activity. There is no
            guarantee of uptime or data retention. This is not a commercial product.
          </p>
          <h1 className="mb-2 mt-6 text-lg font-semibold">Educational Use Disclaimer</h1>
          <p>
            All content, articles, and tutorials published on Blogify are intended
            <span className="italic">solely</span> for educational and informational purposes.
            Blogify is not affiliated with or endorsed by any third-party companies, such as Google,
            Meta, GitHub, or others mentioned in the content. Any references to external products,
            services, or APIs are for demonstration and learning purposes only.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
