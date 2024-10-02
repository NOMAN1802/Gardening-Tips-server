import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';



const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
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

  const result = await UserServices.followUser(followerId, followingId);

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

  const result = await UserServices.unfollowUser(followerId, followingId);

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

  const result = await UserServices.favoritePost(userId, postId);

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

  const result = await UserServices.unfavoritePost(userId, postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post removed from favorites successfully",
    data: result,
  });
});

const getUserFavoritesPosts = catchAsync(
  async (req, res) => {
    const userId = req.params.id;

    const result = await UserServices.getUserFavorites(userId);

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
  const result = await UserServices.verifyUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User verified successfully",
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
  verifyUser
};
