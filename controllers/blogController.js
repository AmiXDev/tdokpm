const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const Admin = mongoose.model('Admin');


exports.blogPost = async (req, res) => {
	const blogPosts = await Blog.find().populate('authors fullName');
	res.render('blog', { title: 'مقالات آموزشی تبلیغات در گوگل', blogPosts });
};



exports.getBlogPostsBySlug = async (req, res, next) => {
	const blogPosts = await Blog.findOne({ slug: req.params.slug }).populate('authors fullName');
	if(!blogPosts) return next();
	res.render('single', { blogPosts, title: blogPosts.title} )

}