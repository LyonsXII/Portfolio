import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import path from 'path';

import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

const app = express();
const port = 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;
// Connect to database
if (process.env.DB_URL) {
  // Production
  db = new pg.Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Local
  db = new pg.Client({
    user: "postgres",
    host: "172.31.192.1",
    database: "Song_Data",
    password: process.env.DB_PASSWORD,
    port: 5432,
  });
}
db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err));

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/numQuestions", async (req, res) => {
  const difficulty = req.body.difficulty;
  const category = req.body.category;
  const numQuestions = await db.query("SELECT COUNT(id) FROM songs WHERE difficulty = $1 AND category = $2", [difficulty, category]);
  res.json(numQuestions.rows[0]["count"]);
});

app.post("/choices", async (req, res) => {
  const difficulty = req.body.difficulty;
  const category = req.body.category;
  const excluded = req.body.excluded;
  const excludedString = excluded.length > 0 ? excluded.join(',') : undefined;
  let choices = {};

  // Pulling four random choices from database, excluding previous answers
  try {
    let query = `
      SELECT id, property 
      FROM songs 
      WHERE difficulty = $1 
      AND category = $2 
    `;

    if (excludedString != undefined && excluded.length > 0) {
      query += `AND id NOT IN (${excluded.map((_, index) => '$' + (index + 3)).join(',')})`;
    }

    query += `
      ORDER BY RANDOM() 
      LIMIT 4`;

    const params = [difficulty, category, ...excluded];
    choices = await db.query(query, params);
    choices = choices.rows;

  } catch(err) {
    console.log(err);
  }

  // Pulling expanded data for correct choice
  try {
    choices[0] = await db.query("SELECT * FROM songs WHERE id=$1", [choices[0].id]);
    choices[0] = choices[0].rows[0];

  } catch(err) {
    console.log(err)
  }

  // Adding correct / false to choices
  choices[0]["correct"] = true;
  for (let i = 1; i < choices.length; i++) {choices[i]["correct"] = false}
  res.json(choices)
});

app.get("/mp3", (req, res) => {
  console.time('getAudio');
  const location = req.query.location;
  const relativeLocation = location.replace(/\\/g, '/');
  const filePath = path.join(__dirname, 'public', relativeLocation);
  res.set('Cache-Control', 'public, max-age=3600'); // Caching file for one hour
  res.sendFile(filePath, () => console.timeEnd('getAudio'));
});


app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});