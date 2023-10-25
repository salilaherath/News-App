"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NewsCard() {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(
        "https://news-app-api-five.vercel.app/api/articles"
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
    <>
      {articles?.map((article) => (
        <Link key={article.id} href={`/news/${article._id}`}>
          <div className="card my-5">
            <h3>{article.title}</h3>
            <Image
              src={article.image}
              alt={article.title}
              width={300}
              height={100}
              className="my-4 rounded-md"
            />
            <div
              dangerouslySetInnerHTML={createMarkup(
                article.description.slice(0, 100) + " ..."
              )}
            />
          </div>
        </Link>
      ))}
    </>
  );
}
