import { Router } from "express";
import { getProduct, getAllProducts } from "../controllers/products.controller.js";

const productPublicRouter = Router();

productPublicRouter.get("/:id", getProduct);
productPublicRouter.get("/", getAllProducts);

export default productPublicRouter;


