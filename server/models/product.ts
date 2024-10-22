import mongoose, { Schema } from "mongoose"
import { ProductModel } from '../utils/types/types'

export default mongoose.model("Product", new mongoose.Schema<ProductModel>({
  type: {
    type: String,
    required: true
  },
  part_number: {
    type: String,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  amount_per_case: {
    type: Number,
    required: true
  },
  cases_per_pallet: {
    type: Number
  },
  cost_per_product: {
    type: Number
  },
  pallet_per_truck: {
    type: Number
  },
  unit_measure: {
    type: String
  },
  note: {
    type: String
  },
  vendor_owned:{
    required:true,
    type: Schema.Types.ObjectId,
    ref:'Vendor'
  }
}), 'Product');

//TODO:: dakota delete quote_contents from quotes where product does not exist