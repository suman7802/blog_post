const Blog = require("../models/blog.model");

async function httpGetAllBlog(req, res) {
  const authorID = req.user._id;
  try {
    const blogs = await Blog.find({author: authorID});
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

async function httpCreateBlog(req, res) {
  const authorID = req.user._id;
  const blog = req.body;
  try {
    const newBlog = new Blog({
      author: authorID,
      ...blog,
    });
    const respond = await newBlog.save();
    return res.status(200).json(respond);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

async function httpDeleteBlog(req, res) {
  const authorID = req.user._id;
  const BlogId = req.body._id;
  try {
    const response = await Blog.findOneAndDelete({
      author: authorID,
      _id: BlogId,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

async function httpUpdateBlog(req, res) {
  const authorID = req.user._id;
  const blogId = req.body._id;
  try {
    const response = await Blog.findOneAndUpdate(
      {author: authorID, _id: blogId},
      {
        title: req.body.title,
        content: req.body.content,
        privet: req.body.privet,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

async function httpGetAllBlogAllUsers(req, res) {
  try {
    const blogs = await Blog.find({privet: false}).populate(
      "author",
      "userName"
    );
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

module.exports = {
  httpGetAllBlogAllUsers,
  httpGetAllBlog,
  httpCreateBlog,
  httpDeleteBlog,
  httpUpdateBlog,
};
