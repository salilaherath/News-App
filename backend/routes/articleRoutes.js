import express from "express";
import { Article } from "../models/article.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

//Get all articles
router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json(articles);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Get a single article
router.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Create new article
router.post("/articles", requireAuth, requireAdmin, async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(200).json(article);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Delete an article
router.delete("/articles/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found!" });
    }
    res.status(200).json(article);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Update an article
router.patch("/articles/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body);
    if (!article) {
      return res.status(404).json({ message: "Article not found!" });
    }
    const updatedArticle = await Article.findById(req.params.id);
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
