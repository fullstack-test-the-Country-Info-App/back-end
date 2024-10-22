import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credencial: true,
};

const app: Express = express();
const port = process.env.PORT || 8000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
