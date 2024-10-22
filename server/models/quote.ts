import mongoose, { Schema, Types } from "mongoose";
import { QuoteContentsModel, QuoteModel } from "../utils/types/types";
import { Quote } from ".";

const quoteSchema = new mongoose.Schema<QuoteModel>({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  quote_content: {
    type: [
      {
        type: {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: Number,
          margin: Number,
        },
      },
    ],
  },
  selling_order_po: {
    type: String,
    unique: true,
  },
});

quoteSchema.pre("save", async function () {
  let quoteCount = (await Quote.countDocuments({})) + 1 + "";
  for (let i = 8 - quoteCount.length; i > 0; i--) {
    quoteCount = "0" + quoteCount;
  }
  this.selling_order_po = quoteCount;
});

export { quoteSchema };

export default mongoose.model("Quote", quoteSchema, "Quote");
