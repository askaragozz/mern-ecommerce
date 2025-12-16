import { Router } from "express";
import { createCategory, getCategory, getAllCategories, updateCategory, deleteCategory } from "../controllers/categories.controller.js";

const categoryAdminRouter = Router();

categoryAdminRouter.post("/", createCategory);
categoryAdminRouter.get("/:id", getCategory);
categoryAdminRouter.get("/", getAllCategories);
categoryAdminRouter.put("/:id", updateCategory);
categoryAdminRouter.delete("/:id", deleteCategory);

export default categoryAdminRouter;