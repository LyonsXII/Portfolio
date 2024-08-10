import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;
const corsOptions = {
  origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/api", (req, res) => {
  res.json({fruit: "banana"});
  console.log("Request received");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});