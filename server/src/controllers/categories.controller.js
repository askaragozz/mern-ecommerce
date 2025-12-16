import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const newCategory = await Category.create(categoryData);
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        console.error('Create Category error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ category });
    } catch (error) {
        console.error('Get Category error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (error) {
        console.error('Get All Categories error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    }   catch (error) {
        console.error('Update Category error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Delete Category error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};