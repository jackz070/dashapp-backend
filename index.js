import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import Product from "./models/Product.js";
import KPI from "./models/KPI.js";
import TRANSACTION from "./models/TRANSACTION.js";
import Item from "./models/Items.js";
import { items, kpis, products, transactions } from "./data/data.js";
import itemRoutes from "./routes/item.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);
app.use("/item", itemRoutes);

const PORT = process.env.PORT || 9000;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log(`API is running on port ${PORT}`);
    });
    // Drop database and seed with data
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // TRANSACTION.insertMany(transactions);
    // Item.insertMany(items);
  })
  .catch((error) => {
    console.log(error);
  });
