const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
name: String,
slugs: String,
shortDescription: String,
parent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory"
 }],
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);

module.exports = { categorySchema, Category };