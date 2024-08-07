import express from "express";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import transactionRoutes from "./src/routes/transaction.js";
import { DEV_URL, PORT, PROD_URL } from "./constants/index.js";

const app = express();
const port = PORT || 6000;

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: [DEV_URL, PROD_URL],
  })
);

app.use("/api/transaction", transactionRoutes);

app.get("/", (_req, res) => {
  return res.status(200).send("Hello World");
});

app.get("/home", (_req, res) => {
  return res.status(200).send("Welcome Home");
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Listening on PORT ${port}.`);
});
