const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
name: String,
slugs: String,
shortDescription: String
}, { timestamps: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = { subCategorySchema, SubCategory };