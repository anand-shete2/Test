import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Eye, Trash2, Edit3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const DashboardSection = ({ blogs }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-w-full">
      {blogs.length === 0 ? (
        <div className="text-muted-foreground text-center sm:text-2xl">
          Your Blogs will be displayed here
        </div>
      ) : (
        <div className="lg:mx-30 mx-10 mt-5 grid grid-cols-1 gap-20 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map(blog => (
            <Card
              key={blog._id}
              className="group border-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-0">
                {/* Blog Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={blog.coverImageURL}
                    alt={blog.title}
                    className="h-48 w-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className="mb-4 line-clamp-2 text-center text-xl font-semibold leading-tight">
                    {blog.title}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/blog/view/${blog._id}`)}
                      className="flex-1 border-neutral-200 text-gray-600 hover:bg-neutral-50 hover:text-gray-900"
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/blog/edit/${blog._id}`)}
                      className="flex-1 border-neutral-200 text-gray-600 hover:bg-neutral-50 hover:text-gray-900"
                    >
                      <Edit3 className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/blog/delete/${blog._id}`)}
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardSection;
