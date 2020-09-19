const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');



const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: 'لطفا یک عنوان برای مقاله وارد کنید.'
	},
	slug: {
		type: String,
		trim: true,
		required: 'لطفا لینک مقاله را وارد کنید.'
	},
	description: {
		type: String,
		required: 'توضیحات مربوط به مقاله را وارد کنید.'
	},
	thumbnailPhotoLocation: {
		type: String

	},
	thumbnailImageAlt: {
		type: String,
		required: 'متن جایگزین عکس کوچک را فراموش کردید'
	},
	featuredPhotoLocation: {
		type: String
	},
	featuredImageAlt: {
		type: String,
		required: 'متن جایگزین عکس شاخص را فراموش کردید'
	},
	category: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
	}],
	subCategory: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SubCategory',
	}],
	tags: {
		type: [String]
	},
	authors: { type: mongoose.Schema.ObjectId, ref:'Admin', required: 'نام نوینسده را انتخاب کنید' },
	keywords: {
		type: [String]
	},
	draftMode: {
		type: Boolean,
		default: false
	},
}, { timestamps: true });


blogSchema.virtual('admins', {
	ref: 'Admin',
	localField: 'authors',
	foreignField: '_id'
});



const Blog = mongoose.model('Blog', blogSchema)
module.exports = { blogSchema, Blog };