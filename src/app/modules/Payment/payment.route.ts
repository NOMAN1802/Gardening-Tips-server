import { Router } from 'express';
import { paymentController } from './payment.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post('/confirmation', paymentController.confirmationController);

router.get(
    "/payment-history",
    auth(USER_ROLE.ADMIN),
    paymentController.getPaymentHistory
  );

export const paymentRoutes = router;