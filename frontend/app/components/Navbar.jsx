"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="flex items-center justify-between">
      <Link href="/">
        <h1>NEWS APP</h1>
      </Link>
      <div className="flex items-center justify-center gap-4">
        {isLoggedIn ? (
          <button className="btn-primary" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <button className="btn-primary">Login</button>
            </Link>
            <Link href="/register">
              <button className="btn-secondary">Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
