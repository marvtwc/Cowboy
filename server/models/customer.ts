import mongoose, { Schema } from "mongoose";
import { CustomerModel } from "../utils/types/types";
import { Employee } from ".";

let customerSchema = new mongoose.Schema<CustomerModel>({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  billing_address: {
    type: String,
  },
  billing_city: {
    type: String,
  },
  billing_state: {
    type: String,
  },
  billing_zip: {
    type: String,
  },
  contacts: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
  },
  margin: {
    type: Number,
  },
  note: {
    type: String,
  },
});

customerSchema.post("deleteOne", async function () {
  //console.log("document deleted:" + this.getQuery()._id)
  let allParentDocs = await Employee.find({ customers: this.getQuery()._id });
  allParentDocs.forEach(async (parent) => {
    await parent.updateOne({
      $pull: { customers: this.getQuery()._id },
    });
    //console.log("Pulled cid: " + this.getQuery()._id + " from "+parent._id)
  });
});

export default mongoose.model("Customer", customerSchema, "Customer");
