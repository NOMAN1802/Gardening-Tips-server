import { join } from "path";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import { User } from "../User/user.model";
import { Payment } from "./payment.model";

const confirmationService = async (transactionId: string) => {
  try {
    const verifyResponse = await verifyPayment(transactionId);

    let result;
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      const userId = transactionId.split("-")[1];
      result = await User.findByIdAndUpdate(
        userId,
        { isVerified: true },
        { new: true }
      );

      await Payment.create({ transactionId, userId });

      if (!result) {
        throw new Error("User not found");
      }

      message = "User verified and payment successful!";
    } else {
      message = "Payment Failed!";
    }

    const filePath = join(__dirname, "../../../../public/confirmation.html");
    let template = readFileSync(filePath, "utf-8");

    template = template.replace("{{message}}", message);

    return template;
  } catch (error) {
    console.error("Error in confirmationService:", error);
    return "An error occurred during payment confirmation";
  }
};

export const paymentServices = {
  confirmationService,
};