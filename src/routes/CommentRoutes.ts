import { Router } from "express";  
import CommentController from "../controllers/CommentController";

const CommentRouter = Router()

CommentRouter.post("/comments", CommentController.listComments)
CommentRouter.post("/comments/create", CommentController.postComment)
CommentRouter.post("/comments/edit/:id", CommentController.editComment)
CommentRouter.post("/comments", CommentController.deleteComment)

export default CommentRouter