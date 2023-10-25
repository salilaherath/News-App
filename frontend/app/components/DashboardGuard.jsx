import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

const DashboardGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode(token);

      if (decodedToken.isAdmin) {
        return;
      }
    }
    router.push("/");
  }, [router]);

  return children;
};

export default DashboardGuard;
