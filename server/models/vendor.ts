import mongoose, { Schema } from "mongoose"
import { VendorModel } from '../utils/types/types'

export default mongoose.model("Vendor", new mongoose.Schema<VendorModel>({
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
    required: true
  },
  contacts: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Contact'
      }
    ],
    required:false
  },
  note: {
    type: String
  }
}), 'Vendor');