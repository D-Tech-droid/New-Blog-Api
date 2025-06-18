"use strict";
const {createBlogService, getAllBlogsService, getBlogByIdService, updateBlogService, deleteBlogService} = require('../service/blogService');

const createBlog = async (req, res) => createBlogService(req, res);
const getAllBlogs = async (req, res) => getAllBlogsService(req, res);
const getBlogById = async (req, res) => getBlogByIdService(req, res);
const updateBlog = async (req, res) => updateBlogService(req, res);
const deleteBlog = async (req, res) => deleteBlogService(req, res);


module.exports = {createBlog, 
    getAllBlogs, 
    getBlogById, 
    updateBlog, 
    deleteBlog};