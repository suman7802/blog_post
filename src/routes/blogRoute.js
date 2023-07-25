const express = require("express");
const blogRouter = express.Router();

const {
  httpGetAllBlogAllUsers,
  httpGetAllBlog,
  httpCreateBlog,
  httpDeleteBlog,
  httpUpdateBlog,
} = require("../controllers/blog.controller");

blogRouter.get("/all", httpGetAllBlogAllUsers); 
blogRouter.get("/", httpGetAllBlog); 
blogRouter.post("/", httpCreateBlog); 
blogRouter.delete("/", httpDeleteBlog); 
blogRouter.put("/", httpUpdateBlog); 

module.exports = blogRouter;
