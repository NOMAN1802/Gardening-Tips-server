import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { postValidations } from "./post.validation";
import { PostController } from "./post.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { multerUpload } from "../../config/multer.config";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { ImageFilesArrayZodSchema } from "../../zod/image.validation";
import { parseBody } from "../../middlewares/bodyParser";

const router = express.Router();

router.post(
  "/create-post", auth(USER_ROLE.USER),multerUpload.fields([{ name: 'postImages' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(postValidations.createPostSchema),
  PostController.createPost
);

router.patch(
  "/update-post/:id",

  validateRequest(postValidations.updatePostSchema),
  PostController.updatePost
);

router.delete(
  "/:id",

  PostController.deletePost
);

router.get("/:id", PostController.getPost);

router.get("/", PostController.getPosts);

router.post(
  "/:id/comments",

  validateRequest(postValidations.commentSchema),
  PostController.addComment
);

router.post(
  "/:id/vote",

  validateRequest(postValidations.voteSchema),
  PostController.vote
);

router.patch(
  "/:postId/comments/:commentId",

  validateRequest(postValidations.editCommentSchema),
  PostController.editComment
);

router.delete("/:postId/comments/:commentId", PostController.deleteComment);

export const postRoutes = router;
