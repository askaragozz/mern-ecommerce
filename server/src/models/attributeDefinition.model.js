import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const attributeDefinitionSchema = new Schema({
    key: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    type: { type: String, required: true, enum: ['input', 'number', 'checkbox', 'select', 'multiselect']},
    unit: { type: String },
    options: [ { type: String, required: function() { return ['select', 'multiselect'].includes(this.type); }} ],
    // Validations will be added
}, { timestamps: true });

// Hooks will be added here in the future

const AttributeDefinition = new model('AttributeDefinition', attributeDefinitionSchema);

export default AttributeDefinition;
