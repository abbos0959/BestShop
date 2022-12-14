// import path from "path";
import express from "express";
// import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const __dirname = path.resolve();

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import dotenv from "dotenv";
import path from "path";

dotenv.config({path:__dirname+".config.env"});

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
   res.send("ARH781vMQYnRKV0c12rPraNXvLTYYJ9kB1J7eSxw4dfMpATWUSQYrB2xrILLxC7M-q6FB931nV0K8utW")
);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/frontend/build")));

   app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
   );
} else {
   app.get("/", (req, res) => {
      res.send("API is running....");
   });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
console.log(process.env.PORT);

app.listen(
   PORT,
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
