import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const attributeDefinitionSchema = new Schema(
  {
    key: { type: String, required: true, trim: true, lowercase: true, unique: true },
    label: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ['input', 'number', 'checkbox', 'select', 'multiselect'],
    },
    unit: { type: String, trim: true },

    options: {
      type: [String],
      default: undefined,
      validate: {
        validator: function (arr) {
          if (!['select', 'multiselect'].includes(this.type)) return true;
          return Array.isArray(arr) && arr.length > 0 && arr.every((x) => typeof x === 'string' && x.trim().length > 0);
        },
        message: 'options is required and must be non-empty for select/multiselect',
      },
    },
  },
  { timestamps: true }
);

const AttributeDefinition = model('AttributeDefinition', attributeDefinitionSchema);
export default AttributeDefinition;
