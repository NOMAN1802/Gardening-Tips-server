import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Payment = mongoose.model("Payment", PaymentSchema);