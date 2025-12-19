import Product from '../models/product.model.js';

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await Product.create(productData);
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Create Product error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('categories');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ product });
    } catch (error) {
        console.error('Get Product error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getAllProducts = async (req, res) => {

    const queryFilter = {};

    const { categoryId} = req.query;

    if (categoryId) queryFilter.categoryIds = [ categoryId ];

    try {
        const products = await Product.find(queryFilter);
        res.status(200).json({ products });
    } catch (error) {
        console.error('Get All Products error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Update Product error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete Product error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Attribute actions
import { normalizeAttributes } from '../helpers/product.helper.js';

export const setAttributes = async (req, res) => {

    try {
        const { productId } = req.params
        const { attributeArr } = req.body;

        const attributes = normalizeAttributes(attributeArr);

        const product = await Product.findByIdAndUpdate(
            productId,
            { $set: { attributes } },
            { new: true, runValidators: true }
        );

        if (!product) return res.status(404).json({ message: 'Product not found' });

        return res.status(200).json({ message: 'Attributes updated', product });
    } catch (error) {
        console.error('Error setting attributes', error);
        return res.status(500).json({ message: 'Error setting attributes' });
    }

}
