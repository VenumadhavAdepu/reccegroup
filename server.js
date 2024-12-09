import express from "express";
import cors from "cors";
import { readFileSync } from "fs";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const data = readFileSync("./api/trips.json");
app.get("/api", (req, res) => {
  res.json(JSON.parse(data));
});

// eslint-disable-next-line no-undef
app.listen(PORT, () =>
  // eslint-disable-next-line no-undef
  console.log(`Example app listening on port ${PORT}!`)
);