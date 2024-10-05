import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";
import { SortOrder } from "mongoose";
import { PostServices } from "./post.service";
import { TImageFiles } from "../../interfaces/image.interface";


const createPost = catchAsync(async (req, res) => {
    
    if (!req.files) {
        throw new AppError(400, 'Please upload an image');
      }
    
  const post = await PostServices.createPost(
    req.body,
    req.files as TImageFiles
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post created successfully",
    data: post,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const result = await PostServices.updatePost(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post updated successfully",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const result = await PostServices.deletePost(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post deleted successfully",
    data: result,
  });
});

const getPost = catchAsync(async (req, res) => {
  const result = await PostServices.getPost(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post retrieved successfully",
    data: result,
  });
});

const getPosts = catchAsync(async (req, res) => {
  const query = { ...req.query };

  // If there's a search term, modify the sort to prioritize upvotes
  if (query.searchTerm) {
    query.sort = "upVotes";
    query.order = "desc";
  }

  const result = await PostServices.getPosts(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Posts retrieved successfully",
    data: result,
  });
});

const addComment = catchAsync(async (req, res) => {
  const result = await PostServices.addComment(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment added successfully",
    data: result,
  });
});

const vote = catchAsync(async (req, res) => {
  const postId = req.params.id;

  const { voteType, userId } = req.body;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
  }

  const result = await PostServices.vote(postId, userId.toString(), voteType);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Vote recorded successfully",
    data: result,
  });
});



const editComment = catchAsync(async (req, res) => {
  const { postId, commentId } = req.params;
  const { content, userId } = req.body;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
  }

  const result = await PostServices.editComment(
    postId,
    commentId,
    userId.toString(),
    content
  );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Comment not found or you are not authorized to edit this comment"
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId } = req.body;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
  }

  const result = await PostServices.deleteComment(
    postId,
    commentId,
    userId.toString()
  );

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Comment not found or you are not authorized to delete this comment"
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment deleted successfully",
    data: result,
  });
});

const getPostsByUser = catchAsync(async (req, res) => {
  const result = await PostServices.getPostsByUser(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Posts retrieved successfully",
    data: result,
  });
});

export const PostController = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  addComment,
  vote,
  editComment,
  deleteComment,
  getPostsByUser,

};