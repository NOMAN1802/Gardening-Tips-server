import { Types } from "mongoose";

export type IPost = {
  title: string;
  postDetails: string;
  author: Types.ObjectId;
  category: string;
  isPremium: boolean;
  images: string[];
  upVotes: number;
  downVotes: number;
  upvotedBy: Types.ObjectId[];
  downvotedBy: Types.ObjectId[];
  comments?: IComment[];
};

export type IComment = {
  content: string;
  commentator: Types.ObjectId;
};