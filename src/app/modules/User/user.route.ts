import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();



// router.get('/',auth(USER_ROLE.ADMIN, USER_ROLE.USER), UserControllers.getAllUsers);
router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.post("/follow/:id", UserControllers.followUser);
router.post("/unfollow/:id", UserControllers.unfollowUser);
router.post("/verify/:id", auth(USER_ROLE.USER), UserControllers.verifyUser);
router.post("/favorite/:id", UserControllers.favoritePost);
router.post("/unfavorite/:id", UserControllers.unfavoritePost);
router.get("/favorites/:id", UserControllers.getUserFavoritesPosts);


export const UserRoutes = router;