import mongoose, { Schema } from "mongoose";
import { AccessL, UserModel } from "../utils/types/types";

export default mongoose.model(
  "Employee",
  new mongoose.Schema<UserModel>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      length: [8, "Password must be at least 8 characters"],
    },
    access: {
      type: String,
      enum: AccessL,
      default: AccessL.user,
      required: true,
    },
    customers: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
      }
      ]
    }
  }),
  "Employee",
);
