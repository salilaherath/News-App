"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/app/components/AuthForm";
import jwt_decode from "jwt-decode";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://news-app-api-five.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const newToken = response.headers.get("x-auth-token");
        if (newToken) {
          localStorage.setItem("token", newToken);

          const decoded = jwt_decode(newToken);
          if (decoded.isAdmin) {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
        } else {
          setError("Token not received in response.");
        }
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <main>
      <h2 className="text-center">Login</h2>

      <AuthForm handleSubmit={handleSubmit} />

      {error && <div className="error">{error}</div>}
    </main>
  );
}
