import { Router } from "express";
import { createCategory, getCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/categories.controller.js";

const categoryRouter = Router();

// Admin only routes will be added here later
categoryRouter.post("/", createCategory);
categoryRouter.get("/:id", getCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;