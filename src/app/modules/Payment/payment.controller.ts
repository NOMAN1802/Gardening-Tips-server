import { Request, Response } from "express";
import { paymentServices } from "./payment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId } = req.query;

  const result = await paymentServices.confirmationService(
    transactionId as string
  );
  res.send(result);
};

const getPaymentHistory = catchAsync(async (req, res) => {
  const data = await paymentServices.getPaymentHistoryFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment history retrived Successfully',
    data: data,
  });
});

export const paymentController = {
  confirmationController,
  getPaymentHistory,
};