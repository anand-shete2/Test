import api from "@/api";
import { Loader } from "@/components/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addComment } from "@/features/blogSlice";
import { setBlog } from "@/features/blogSlice";
import { NavLink, useNavigate, useParams } from "react-router";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { motion } from "motion/react";

export default function Blog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const user = useSelector(state => state.user);
  const blog = useSelector(state => state.blogs[0]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/blog/${blogId}`);
        setBlog(res.data.blog);
        dispatch(setBlog(res.data.blog));
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, user]);

  const postComment = async e => {
    try {
      e.preventDefault();

      const res = await api.post(`blog/comment/add/${blog._id}`, {
        content: comment,
        createdBy: user._id,
      });
      toast.success(res.data.message);
      dispatch(addComment(res.data.comments));
      setComment("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-w-full">
      {loading ? (
        <div className="flex min-h-screen items-center">
          <Loader />
        </div>
      ) : (
        <div className="mx-auto mt-10 flex w-[80vw] flex-col">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-10 text-center text-2xl font-semibold sm:text-5xl"
          >
            {blog.title}
          </motion.h1>
          <img
            src={blog.coverImageURL}
            alt="coverImageURL"
            className="m-10 mx-auto inline-block rounded-md sm:max-w-[50vw]"
          />
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="mb-5 first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-bold first-letter:capitalize"
          />
          <div className="mb-5 flex items-center justify-center space-x-5">
            <motion.img
              src={blog.createdBy.profileImageURL}
              className="h-20 rounded-full border-2 border-black"
              alt="author"
              referrerPolicy="no-referrer"
              onError={e => {
                e.target.onerror = null;
                e.target.src =
                  blog.createdBy.profileImageURL.replace(/=s\d+-c$/, "=s200-c") +
                  `?t=${Date.now()}`;
              }}
              whileHover={{ scale: 1.1 }}
            />
            <div className="flex flex-col">
              <h1>Written By</h1>
              <h1 className="text-xl font-semibold">{blog.createdBy.name}</h1>
            </div>
          </div>
          <p className="border-1" />

          {/* Comments Sectiom */}
          <div className="my-20 flex flex-col">
            <h1 className="pl-2 text-2xl font-semibold">{blog.comments.length} Comments</h1>
            {user._id ? (
              <div className="flex items-center space-x-3 py-5 md:py-10">
                <img
                  src={user.profileImageURL}
                  className="h-12 w-12 rounded-full border border-black"
                />
                <form className="flex items-center space-x-5" onSubmit={postComment}>
                  <div className="flex flex-col">
                    <Label className="pb-1 pl-1 font-semibold">{user.name}</Label>
                    <Input
                      placeholder="What do you think?"
                      name="comment"
                      type="text"
                      required
                      autoComplete="on"
                      value={comment || ""}
                      onChange={e => setComment(e.target.value)}
                      className="sm:w-sm md:w-md lg:min-w-xl"
                    />
                  </div>
                  <Button type="submit" className="relative top-2">
                    <Send className="" />
                    <span className="hidden sm:inline">Post</span>
                  </Button>
                </form>
              </div>
            ) : (
              <div className="my-3 rounded-2xl p-4 shadow-2xl">
                Please{" "}
                <NavLink to="/login" className="underline underline-offset-1">
                  Login
                </NavLink>{" "}
                to Add Comments
              </div>
            )}
            {blog.comments.map((comment, index) => (
              <div key={index} className="flex space-x-3 py-4">
                <img
                  src={comment.createdBy.profileImageURL}
                  alt="avatar"
                  className="h-12 rounded-full border border-black"
                  referrerPolicy="no-referrer"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      blog.createdBy.profileImageURL.replace(/=s\d+-c$/, "=s200-c") +
                      `?t=${Date.now()}`;
                  }}
                />
                <div className="flex flex-col">
                  <div className="font-semibold">{comment.createdBy.name}</div>
                  <div>{comment.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
