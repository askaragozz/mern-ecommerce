import { Router } from "express";
import { createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";

const productAdminRouter = Router();

productAdminRouter.post("/", createProduct);
productAdminRouter.put("/:id", updateProduct);
productAdminRouter.delete("/:id", deleteProduct);

export default productAdminRouter;