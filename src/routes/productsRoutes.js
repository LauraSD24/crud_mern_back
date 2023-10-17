import { Router } from "express";
import { addProduct, deleteProduct, getProducts, searchProducts, updateProduct } from "../controllers/productsControllers.js";

const productsRoutes = Router();

productsRoutes.post("/add-product",addProduct);
productsRoutes.get("/get-all-products",getProducts);
productsRoutes.put("/edit-product/:id",updateProduct);
productsRoutes.delete("/delete-product/:id",deleteProduct);
productsRoutes.get("/search-products/:search",searchProducts);

export default productsRoutes;