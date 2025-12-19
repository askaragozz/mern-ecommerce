import { Router } from "express";
import { createProduct, updateProduct, deleteProduct, setAttributes } from "../controllers/products.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";

const productAdminRouter = Router();

//product routes
productAdminRouter.post("/", requireAuth, requireAdmin, createProduct);
productAdminRouter.put("/:id", requireAuth, requireAdmin, updateProduct);
productAdminRouter.delete("/:id", requireAuth, requireAdmin, deleteProduct);

//product attribute routes
productAdminRouter.post("/attributes/:productId", requireAuth, requireAdmin, setAttributes);


export default productAdminRouter;