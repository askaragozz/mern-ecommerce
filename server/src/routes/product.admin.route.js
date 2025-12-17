import { Router } from "express";
import { createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { requireAuth } from "../middlewares/auth/requireAuth.js";

const productAdminRouter = Router();

productAdminRouter.post("/", requireAuth, createProduct);
productAdminRouter.put("/:id", requireAuth,updateProduct);
productAdminRouter.delete("/:id", requireAuth, deleteProduct);

export default productAdminRouter;