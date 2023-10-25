"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthForm from "@/app/components/AuthForm";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        next: {
          revalidate: 0,
        },
      });

      if (response.ok) {
        router.push("/");
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
      <h2 className="text-center">Register</h2>

      <AuthForm handleSubmit={handleSubmit} />

      {error && <div className="error">{error}</div>}
    </main>
  );
}
