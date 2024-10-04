import { QueryBuilder } from '../../builder/QueryBuilder';
import { initiatePayment } from '../Payment/payment.utils';
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


const followUserToDB = async (followerId: string, followingId: string) => {
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

const unfollowUserToDB = async (followerId: string, followingId: string) => {
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


const VerifyUserToDB = async (id: string) => {
  // TODO: FOR DEVELOPMENT 1 VOTE
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

  const paymentData = {
    transactionId: `TRXN-${id}-${Date.now()}`,
    totalAmount: "999",
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.mobileNumber,
  };
  console.log(paymentData);

  const paymentSession = await initiatePayment(paymentData);
  console.log(paymentSession);
  

  return paymentSession;
};

const favoritePostToDB = async (userId: string, postId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoritesPosts: postId } },
    { new: true }
  );

  return result;
};

const unfavoritePostToDB = async (userId: string, postId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { $pull: { favoritesPosts: postId } },
    { new: true }
  );

  return result;
};

const getUserFavoritesFromBd = async (userId: string) => {
  const result = await User.findById(userId).populate("favoritesPosts");
  return result?.favoritesPosts;
};
export const UserServices = {
  
  getAllUsersFromDB,
  getSingleUserFromDB,
  followUserToDB,
  unfollowUserToDB,
  VerifyUserToDB,
  favoritePostToDB,
  unfavoritePostToDB,
  getUserFavoritesFromBd,
};
