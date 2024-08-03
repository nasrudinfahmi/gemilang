import express from "express";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";

const app = express();
const port = process.env.PORT || 6000;
const DEV_URL = process.env.DEV;
const PROD_URL = process.env.PROD;

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: [DEV_URL, PROD_URL],
  })
);

app.get("/", (_req, res) => {
  return res.status(200).send("Hello World");
});

app.get("/home", (_req, res) => {
  return res.status(200).send("Welcome Home");
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Listening on PORT ${port}.`);
});
