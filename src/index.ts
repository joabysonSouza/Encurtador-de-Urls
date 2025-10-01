import express, {Request , Response} from "express";
import { customAlphabet } from "nanoid";
import db from "./db.js";

const app = express();
const port = 3000;
app.use(express.json())

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 7);

const insertUrl = db.prepare("INSERT INTO urls (slug,  original_url) VALUES (?, ?)");
const getBySlug = db.prepare("SELECT * urls WHERE = ? ")


app.get("/shorten", (req: Request, res: Response) => {
   const { url, slug } = req.body;
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

