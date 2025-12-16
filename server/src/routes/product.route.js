import { Router } from "express";
import { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } from "../controllers/products.controller.js";

const productRouter = Router();

// authenticated routes will be added here later

productRouter.post("/", createProduct); // Owner or Admin only
productRouter.get("/:id", getProduct); // Public route
productRouter.get("/", getAllProducts); // Public route
productRouter.put("/:id", updateProduct); // Owner or Admin only
productRouter.delete("/:id", deleteProduct); // Owner or Admin only

export default productRouter;