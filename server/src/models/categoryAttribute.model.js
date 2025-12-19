import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categoryAttributeSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    attributeDefinitionId: { type: Schema.Types.ObjectId, ref: 'AttributeDefinition', required: true },

    isRequired: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },

    // Optional overrides per category (keep it minimal)
    allowedOptions: { type: [String], default: undefined }, // subset override for select/multiselect
    min: { type: Number, default: undefined }, // for number
    max: { type: Number, default: undefined }, // for number
  },
  { timestamps: true }
);

// prevent duplicates
categoryAttributeSchema.index({ categoryId: 1, attributeDefinitionId: 1 }, { unique: true });

const CategoryAttribute = model('CategoryAttribute', categoryAttributeSchema);
export default CategoryAttribute;
