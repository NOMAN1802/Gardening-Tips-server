import mongoose from "mongoose";
import { z } from "zod";

const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100),
    postDetails: z.string().min(1),
    author: z
    .string({
      required_error: 'Category is required',
    })
    .refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }), 
    category: z.enum(["Vegetables", "Flowers", "Landscaping", "Herb", "Indoor", "Fruits"]), 
    isPremium: z.boolean().optional(), 
    image: z.string().optional(),
     
  }),
});

const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100).optional(),
    postDetails: z.string().min(1).optional(),
    category: z.enum(["Vegetables", "Flowers", "Landscaping", "Herb", "Indoor", "Fruits"]).optional(),
    isPremium: z.boolean().optional(),
    images: z.array(z.string()).optional(),
  }),
});

const commentSchema = z.object({
  body: z.object({
    content: z.string().min(1),
    commentator: z.string({ required_error: "Commentator is required" }), 
  }),
});

const editCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1).optional(),
  }),
});


const voteSchema = z.object({
  body: z.object({
    voteType: z.enum(["upvote", "downvote"]),
  }),
});


export const postValidations = {
  createPostSchema,
  updatePostSchema,
  commentSchema,
  voteSchema,
  editCommentSchema,
};
