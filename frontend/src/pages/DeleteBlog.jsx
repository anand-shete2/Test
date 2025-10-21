import api from "@/api";
import { Loader } from "@/components/common";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function DeleteBlog() {
  const navigate = useNavigate();
  const { blogId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.delete(`/blog/delete/${blogId}`);
        toast.success(res.data.message);
        navigate("/dashboard");
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="flex min-h-[80vh] min-w-full flex-col items-center justify-center">
      <h1 className="mb-15 text-2xl sm:text-5xl">Please Wait</h1>
      <Loader />
    </div>
  );
}
