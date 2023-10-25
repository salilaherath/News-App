"use client";

import Tiptap from "@/app/components/Tiptap";
import { useState } from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      author,
      description: description,
    };

    try {
      const response = await fetch("http://localhost:4000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Article created successfully");
        console.log(formData);
      } else {
        console.error("Error creating article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span>Author:</span>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
        </label>
        <label>
          <span>Description:</span>
          <Tiptap setDescription={setDescription} />
        </label>
        <button type="submit" className="btn-primary mt-8">
          Submit
        </button>
      </form>
    </main>
  );
}
