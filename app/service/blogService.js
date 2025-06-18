"use strict";
const Blog = require("../models/blog")
const { StatusCodes } = require("http-status-codes")
const blogValidator = require("../validation/blogValidation")
const { resolveRequestQueryToMongoDBQuery } = require("../utils/helper")


exports.createBlog = async (body, req) => {
   try {

      const validatorError = await blogValidator.createBlog(body)

      if (validatorError) {
         return {
            error: validatorError,
            statusCode: StatusCodes.BAD_REQUEST,
         }
      }
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      const createBlog = await Blog.create({
         blogTitle: body.blogTitle,
         blogBody: body.blogBody,
         author: body.author,
         date: body.date,
         image: imageUrl
      })

      return {
         data: createBlog,
         statusCode: StatusCodes.CREATED,
      }

   } catch (e) {
      console.log("An unknown error has occurred. Please try again later." + e)
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }
   }
}

exports.getAllBlogs = async (req, res) => {
   try {
      const mongodbQuery = resolveRequestQueryToMongoDBQuery(requestParams);

      const blogs = await Blog
         .find(mongodbQuery.filter)
         .skip(mongodbQuery.page)
         .sort(mongodbQuery.sort)
         .limit(mongodbQuery.limit);


     return res.status(StatusCodes.OK).json({ data: blogs });

   } catch (e) {
      console.log("An unknown error has occurred. Please try again later." + e)
     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: e.message });
      }
   }


exports.getBlogByIdService = async (blogId) => {
   try {
      const blog = await Blog.findById(blogId)

      if (!blog) {
         return {
            error: "Oops! This blog detail is not found on this platform",
            statusCode: StatusCodes.NOT_FOUND,
         }
      }

      return {
         data: blog,
         statusCode: StatusCodes.OK,
      }

   } catch (e) {
      console.log("An unknown error has occurred. Please try again later." + e)
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }
   }
}

exports.updateBlog = async (blogId,body, req) => {
   try {
      const validatorError = await blogValidator.updateBlog(body);
      if (validatorError) {
         return {
            error: validatorError,
            statusCode: StatusCodes.BAD_REQUEST,
         };
      }

      const blog = await Blog.findById(blogId);
      if (!blog) {
         return {
            error: "Blog post not found",
            statusCode: StatusCodes.NOT_FOUND,
         };
      }

      let updatedData = {
         blogTitle: body.blogTitle,
         blogBody: body.blogBody,
         author: body.author,
         date: body.date,
      };

      if (req.file) {
         updatedData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }

      const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, {
         new: true,
         runValidators: true,
      });

      return {
         data: updatedBlog,
         statusCode: StatusCodes.OK,
      };

   } catch (e) {
      console.error("UpdateBlog error:", e);
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
   }
};

exports.deleteBlog = async (blogId) => {
   try {
      const blog = await Blog.findById(blogId);
      if (!blog) {
         return {
            error: "Blog post not found",
            statusCode: StatusCodes.NOT_FOUND,
         };
      }

      await blog.deleteOne();

      return {
         data: "Blog deleted successfully",
         statusCode: StatusCodes.OK,
      };

   } catch (e) {
      console.error("DeleteBlog error:", e);
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      };
   }
};

