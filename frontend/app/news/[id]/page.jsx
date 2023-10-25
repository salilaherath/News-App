"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function NewsDetails({ params }) {
  const [article, setArticle] = useState();
  const id = params.id;

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(
        `https://news-app-api-five.vercel.app/api/articles/${id}`
      );
      const json = await res.json();
      if (res.ok) {
        setArticle(json);
      }
    };

    fetchArticle();
  }, []);

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <main>
      <h1>{article?.title}</h1>
      <div className="flex items-center justify-center">
        <Image
          src={article?.image}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "90%", height: "auto" }}
          className="my-8"
        />
      </div>
      <div dangerouslySetInnerHTML={createMarkup(article.description)} />
    </main>
  );
}
