import express from 'express';
import { createComment, deleteComment, getAllComments, getSingleComment } from '../controllers/commentsController.js';

const router = express.Router();

// Lag ny kommentar
router
    .route('/comments')
    .post(createComment)
    .get(getAllComments);

router
    .route('/comments/:id')
    .get(getSingleComment)
    .delete(deleteComment);

export default router;