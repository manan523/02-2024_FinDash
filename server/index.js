import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/route.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";
import path from "path";
// import { dirname } from "path";

// Configuration
dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "client", "dist")));
//Routes
app.use("/api", routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// Mongoose Setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
      return;
    });
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((err) => console.log(err + "\n" + "Connection Unsuccessful"));
