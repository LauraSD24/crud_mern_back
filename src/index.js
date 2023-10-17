import express from "express";
import dotenv from "dotenv";
import productsRoutes from "./routes/productsRoutes.js";
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    author: "Laura salguedo",
    message: "Bienvenido a mi API de productos",
  });
});
app.use(productsRoutes);

app.listen(process.env.PORT, () => {
  console.log("Aplicación corriendo en el puerto", process.env.PORT);
});
