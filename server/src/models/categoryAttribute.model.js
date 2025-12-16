import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categoryAttributeSchema = new Schema({
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    attributeDefinitionId: { type: Schema.Types.ObjectId, ref: 'AttributeDefinition', required: true },
    isRequired: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
}, { timestamps: true });

// Hooks will be added here in the future

const CategoryAttribute = new model('CategoryAttribute', categoryAttributeSchema);

export default CategoryAttribute;