import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';



const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});



const followUser = catchAsync(async (req, res) => {
  const { followerId } = req.body;
  const followingId = req.params.id;

  const result = await UserServices.followUserToDB(followerId, followingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User followed successfully",
    data: result,
  });
});

const unfollowUser = catchAsync(async (req, res) => {
  const { followerId } = req.body;
  const followingId = req.params.id;

  const result = await UserServices.unfollowUserToDB(followerId, followingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User unfollowed successfully",
    data: result,
  });
});


const favoritePost = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const postId = req.params.id;

  const result = await UserServices.favoritePostToDB(userId, postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post added to favorites successfully",
    data: result,
  });
});


const unfavoritePost = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const postId = req.params.id;

  const result = await UserServices.unfavoritePostToDB(userId, postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post removed from favorites successfully",
    data: result,
  });
});

const getUserFavoritesPosts = catchAsync(
  async (req, res) => {


    const result = await UserServices.getUserFavoritesFromBd(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User favorites retrieved successfully",
      data: result,
    });
  }
);
const verifyUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.VerifyUserToDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User verified successfully",
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const result = await UserServices.getUserByIdFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const currentUser = await UserServices.getUserByIdFromDB(id);

  if (!currentUser) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "User not found",
      data: null,
    });
  }
  const mergedData = { ...currentUser.toObject(), ...updateData };
  const result = await UserServices.updateUserInToDB(id, mergedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your profile updated successfully",
    data: result,
  });
});



export const UserControllers = {
  getSingleUser,
  getAllUsers,
  followUser,
  unfollowUser,
  favoritePost,
  unfavoritePost,
  getUserFavoritesPosts,
  verifyUser,
  getUserById,
  updateUser,
};
