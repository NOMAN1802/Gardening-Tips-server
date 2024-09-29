import { QueryBuilder } from '../../builder/QueryBuilder';
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


export const UserServices = {
  
  getAllUsersFromDB,
  getSingleUserFromDB,
  followUser,
  unfollowUser
};
