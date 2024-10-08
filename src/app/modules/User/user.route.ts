import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';


const router = express.Router();



router.get('/',auth(USER_ROLE.ADMIN, USER_ROLE.USER), UserControllers.getAllUsers);

router.get('/:id', UserControllers.getSingleUser);
router.post("/follow/:id", UserControllers.followUser);
router.post("/unfollow/:id", UserControllers.unfollowUser);
router.post("/verify/:id", auth(USER_ROLE.USER), UserControllers.verifyUser);
router.post("/favorite/:id", UserControllers.favoritePost);
router.post("/unfavorite/:id", UserControllers.unfavoritePost);
router.get("/favorites/:id", UserControllers.getUserFavoritesPosts);
router.put(
    "/changeStatus/:id",
    auth(USER_ROLE.ADMIN),
    UserControllers.changeUserStatus
  );

export const UserRoutes = router;