import express from 'express';
import { createPost, deletePost, getAllPosts, getSinglePost } from '../controllers/postsController.js';

const router = express.Router();

router
    .route('/posts')
    .post(createPost)
    .get(getAllPosts);

router
    .route('/posts/:id')
    .get(getSinglePost)
    .delete(deletePost);

export default router;