import express, { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import db from "./db.js";

const app = express();

app.use(express.json());

interface UrlRow {
  slug: string;
  original_url: string;
}

const PORT = process.env.PORT || 3000;

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 7);

const insertUrl = db.prepare(
  "INSERT INTO urls (slug,  original_url) VALUES (?, ?)"
);
const getBySlug = db.prepare("SELECT * FROM urls WHERE slug  = ? ");

app.post("/shorten", (req: Request, res: Response) => {
  const { url, slug } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ erro: "Sua Url é invalida" });
  }

  let finalSlug = slug || nanoid();

  try {
    insertUrl.run(finalSlug, url);
  } catch (error: any) {
    return res.status(409).json({ error: "Slug já exite " });
  }



  const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
  const shortUrl = `${BASE_URL}/${finalSlug}`;
  return res
    .status(201)
    .json({
      message: "URL encurtada com sucesso!",
      slug: finalSlug,
      shortUrl,
      original: url,
    });
});

app.get("/:slug", (req: Request, res: Response) => {
  const { slug } = req.params;
  const row = (getBySlug.get(slug) as UrlRow) || undefined;

  if (!row) {
    return res.status(404).send("Slug não encontrada ");
  }

  return res.redirect(row.original_url);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
