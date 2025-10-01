import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World com Node, Express e TypeScript (ESM)!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

