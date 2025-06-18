"use strict";
const express = require("express");
const {createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog} = require("../app/controller/blogController");
const authenticateUser = require('../app/middleware/authMiddleware');
const upload = require('../app/utils/imageUploader');
const router = express.Router();

router.post('/', authenticateUser, upload.single("image"), createBlog);
router.get('/',getAllBlogs);
router.get('/:id', getBlogById);
router.patch('/:id', authenticateUser, upload.single("image"), updateBlog);
router.delete('/:id', authenticateUser, deleteBlog);

module.exports = router;