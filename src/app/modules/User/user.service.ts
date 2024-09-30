import { QueryBuilder } from '../../builder/QueryBuilder';
import { Post } from '../Post/post.model';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};


const followUser = async (followerId: string, followingId: string) => {
  const result = await User.findByIdAndUpdate(
    followerId,
    { $addToSet: { following: followingId } },
    { new: true }
  );

  await User.findByIdAndUpdate(followingId, {
    $addToSet: { followers: followerId },
  });

  return result;
};

const unfollowUser = async (followerId: string, followingId: string) => {
  const result = await User.findByIdAndUpdate(
    followerId,
    { $pull: { following: followingId } },
    { new: true }
  );

  await User.findByIdAndUpdate(followingId, {
    $pull: { followers: followerId },
  });

  return result;
};

const verifyUser = async (id: string) => {
  // Check if the user has at least one post with 5 or more upvotes
  const eligiblePost = await Post.findOne({ author: id, upVotes: { $gte: 1 } });

  if (!eligiblePost) {
    throw new Error("User is not eligible for verification");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("User is already verified");
  }

  // Initiate payment
  // ! TODO PAYMEMT <--->
};

const favoritePost = async (userId: string, postId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoritesPosts: postId } },
    { new: true }
  );

  return result;
};

const unfavoritePost = async (userId: string, postId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { $pull: { favoritesPosts: postId } },
    { new: true }
  );

  return result;
};

const getUserFavorites = async (userId: string) => {
  const result = await User.findById(userId).populate("favoritesPosts");
  return result?.favoritesPosts;
};
export const UserServices = {
  
  getAllUsersFromDB,
  getSingleUserFromDB,
  followUser,
  unfollowUser,
  verifyUser,
  favoritePost,
  unfavoritePost,
  getUserFavorites,
};
