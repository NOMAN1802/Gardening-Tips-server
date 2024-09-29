import { ObjectId, Types } from "mongoose";

export type IPost = {
  title: string;
  postDetails: string;
  author: ObjectId;
  category: "Vegetables" | "Flowers" | "Landscaping" | "Herb" | "Indoor" | "Fruits"; 
  isPremium: boolean;
  images?: string[];
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




