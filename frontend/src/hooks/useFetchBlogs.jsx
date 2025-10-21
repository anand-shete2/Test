import api from "@/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/features/userSlice";
import { setAllBlogs } from "@/features/blogSlice";
import { useNavigate } from "react-router";

const useFetchBlogs = () => {
  const user = useSelector(user => user.user);
  const blogs = useSelector(blogs => blogs.blogs);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user._id) {
      (async () => {
        try {
          const res = await api.get("/user/auth/status");
          dispatch(setUser(res.data));
        } catch (error) {
          toast.error(error.response.data.message);
          navigate("/login");
        }
      })();
    }
    if (user._id) {
      (async () => {
        try {
          const res = await api.get(`/blog/getBlogs/${user._id}`);
          dispatch(setAllBlogs(res.data));
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [dispatch, user]);

  return { blogs, loading, user };
};

export default useFetchBlogs;
