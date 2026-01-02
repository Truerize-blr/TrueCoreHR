import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 🔥 THIS IS THE KEY
});

export default function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const resolve = async () => {
      try {
        const res = await api.get("/api/auth/me");
        const role = res.data?.data?.role;

        if (role === "SUPER_ADMIN") {
          navigate("/super_admin/dashboard");
        } else if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/employee");
        }
      } catch (err) {
         console.error("Redirect auth failed", err);
        navigate("/login");
      }
    };

    resolve();
  }, [navigate]);

  return null;
}