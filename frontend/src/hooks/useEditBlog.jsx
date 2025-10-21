import api from "@/api";
import { setUser } from "@/features/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const useEditBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/user/auth/status");
        dispatch(setUser(res.data));
      } catch (error) {
        toast.error(error.response.data.message);
        navigate("/login");
      }
    })();

    if (blogId) {
      (async () => {
        try {
          const res = await api.get(`/blog/${blogId}`);
          setBlog({
            content: res.data.blog.content,
            title: res.data.blog.title,
          });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      })();
    }
  }, []);

  return { blog, loading };
};

export default useEditBlog;
