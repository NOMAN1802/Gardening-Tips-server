import mongoose, { Schema, Document } from "mongoose";
import { IPost, IComment } from "./post.interface";
import { User } from "../User/user.model";

const CommentSchema: Schema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    commentator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const PostSchema: Schema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    postDetails: { type: String, required: true },
    author:  {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: { type: String,enum: ["Vegetables", "Flowers", "Landscaping", "Herb","Indoor","Fruits"],required: true},
    isPremium: { type: Boolean, default: false },
    images: {
      type: [String],
      default: [],
    },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    upvotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

// Middleware to increment upvote count in associated user
PostSchema.post('save', async function (doc) {
  try {
    await User.findByIdAndUpdate(doc.author, {
      $inc: { upVoteCount: 1 },
    });
  } catch (error) {
    throw new Error(
      `Failed to increment upvoteCount count for User ${doc.author}: ${error}`
    );
  }
});

export const Post = mongoose.model<IPost & Document>("Post", PostSchema);

