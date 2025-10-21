import api from "@/api";
import { Loader } from "@/components/common";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearUser } from "@/features/userSlice";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        await api.get("/user/logout");
        navigate("/");
        dispatch(clearUser());
      } catch (error) {}
    })();
  }, []);

  return <Loader />;
}
