import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import path from 'path';
import fs from "fs";

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

const allowedOrigins = [
  'https://portfolio-lyonsxiis-projects.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/numQuestions", async (req, res) => {
  const difficulty = req.body.difficulty;
  const category = req.body.category;
  const numQuestions = await db.query("SELECT COUNT(id) FROM song_data WHERE difficulty = $1 AND category = $2", [difficulty, category]);
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
      FROM song_data 
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
    choices[0] = await db.query("SELECT * FROM song_data WHERE id=$1", [choices[0].id]);
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
  const location = req.query.location;
  const relativeLocation = location.replace(/\\/g, "/");
  const filePath = path.join(__dirname, "public", relativeLocation);
  res.set("Cache-Control", "public, max-age=3600"); // Cache file for one hour
  res.sendFile(filePath);
});

// Author analysis report fetch functions
// Included as python-server to intensive for free hosting on Render
// Purely for portfolio demo
app.get("/author_details", (req, res) => {
  try {
    const filePath = path.join(__dirname, "public/author reports/Plot Metrics.json");
    const data =  fs.readFileSync(filePath, 'utf8');
    const authorDetails = JSON.parse(data);

    res.json(authorDetails)
  } catch (err) {
      console.log(err)
  }
})

app.post("/author_report", (req, res) => {
  try {
    const author = req.body.author;
    const relativeLocation = "public/author reports/" + author + ".json"
    const filePath = path.join(__dirname, relativeLocation);

    const data = fs.readFileSync(filePath, 'utf8');
    const authorReport = JSON.parse(data);
    res.json(authorReport);

  } catch(err) {
    console.log(err)
  }
});

app.post("/wordcloud", (req, res) => {
  try {
  const author = req.body.author;
  const relativeLocation = "public/author reports/" + author + " - Wordcloud.jpg"
  const filePath = path.join(__dirname, relativeLocation);

  res.sendFile(filePath, err => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error sending wordcloud" });
    }
  });

  } catch(err) {
    console.log(err)
  }
})

app.post("/topic_analysis", (req, res) => {
  try {
    const author = req.body.author;
    const relativeLocation = "public/author reports/" + author + " - Topic Analysis.html"
    const filePath = path.join(__dirname, relativeLocation);

    res.sendFile(filePath, err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error sending topic analysis" });
      }
    });

  } catch(err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});