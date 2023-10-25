"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardGuard from "../components/DashboardGuard";

export default function Dashboard() {
  const [articles, setArticles] = useState(null);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://news-app-api-five.vercel.app//api/articles/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        // Remove the deleted article from the state
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(
        "https://news-app-api-five.vercel.app//api/articles"
      );
      const json = await res.json();
      if (res.ok) {
        setArticles(json);
      }
    };

    fetchArticles();
  }, []);

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <DashboardGuard>
      <main>
        <Link href="dashboard/create">
          <button className="btn-primary">Create New</button>
        </Link>
        {articles?.map((article) => (
          <div className="card my-5">
            <h3>{article.title}</h3>
            <div className="flex items-start justify-center gap-4">
              <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={100}
                className="my-4 rounded-md"
              />
              <div
                dangerouslySetInnerHTML={createMarkup(article.description)}
              />
              <div className="flex flex-col gap-5">
                <button className="btn-secondary">Update</button>
                <button
                  className="btn-primary"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </DashboardGuard>
  );
}
