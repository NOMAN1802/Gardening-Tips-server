import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

export const UserRoutes = router;


router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.post("/follow/:id", UserControllers.followUser);

router.post("/unfollow/:id", UserControllers.unfollowUser);
