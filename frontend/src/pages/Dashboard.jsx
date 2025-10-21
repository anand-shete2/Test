import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useFetchBlogs from "@/hooks/useFetchBlogs";
import { DashboardSection, DashboardLoader } from "@/components/Dashboard";

export default function UserHome() {
  const { blogs, loading, user } = useFetchBlogs();

  return (
    <div className="min-h-screen min-w-full">
      <div className="lg:mx-30 mx-10 mt-5 px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-gray-600">Create, edit, and share your stories anytime.</p>
          </div>
          <Link to="/blog/add">
            <Button className="w-fit bg-neutral-900 text-white hover:bg-neutral-800">
              <Plus className="mr-2 h-4 w-4" />
              Add Blog
            </Button>
          </Link>
        </div>
        <h2 className="-mb-5 mt-10 text-2xl font-semibold">Your Posts</h2>
      </div>

      {loading ? <DashboardLoader /> : <DashboardSection blogs={blogs} />}
    </div>
  );
}
