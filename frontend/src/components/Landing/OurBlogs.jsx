import api from "@/api";
import { BookOpen, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setAllBlogs } from "@/features/blogSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@/components/common";

export default function OurBlogs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/blogs");
        dispatch(setAllBlogs(res.data.blogs));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="border-b py-10 lg:py-20">
      <h1 className="text-primary mb-4 flex items-center justify-center text-2xl font-semibold lg:text-4xl">
        <BookOpen className="lg:scale-130 mr-3 scale-110" strokeWidth={1.5} />
        Explore Blogs
      </h1>
      <p className="mb-10 text-center">
        Browse every blog ever published — discover stories, tutorials, and insights, all in one
        place.
      </p>
      <div className="lg:mx-30 mx-10 grid grid-cols-1 gap-16 text-center lg:grid-cols-2 xl:grid-cols-3">
        {blogs.map(blog => (
          <Card
            key={blog._id}
            className="group border-neutral-600 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={blog.coverImageURL}
                  alt={blog.title}
                  className="h-48 w-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
              </div>

              <div className="p-6">
                <h3 className="mb-4 line-clamp-2 text-center text-xl font-semibold leading-tight">
                  {blog.title}
                </h3>

                <CardFooter className="w-full justify-center [&_span]:hidden [&_span]:sm:inline">
                  <Button onClick={() => navigate(`/blog/view/${blog._id}`)}>
                    <Eye className="mb-[1px]" />
                    <span>View</span>
                  </Button>
                </CardFooter>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
