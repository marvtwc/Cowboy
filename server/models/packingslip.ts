import mongoose, { Schema } from "mongoose"
import { PackingSlipModel } from '../utils/types/types'


let packingSlipSchema = new mongoose.Schema<PackingSlipModel>(
    {
      generating_invoice: {
        type:Schema.Types.ObjectId,
        ref:"Invoice"
      },
      order_content: {
        type: [
            {
              product: {
                type: {
                  type: {type:String},
                  part_number: String,
                  product_name:String,
                  size: String,
                  amount_per_case:Number,
                  cases_per_pallet:Number,
                  cost_per_product:Number,
                  pallet_per_truck:Number,
                  unit_measure:String,
                  note:String,
                  vendor_owned: {
                    type: Schema.Types.ObjectId,
                    ref: 'Vendor'
                  }
                }
              },
              quantity:{
                type: Number
              }
            }
          ]
        }
      }
    )



export default mongoose.model("PackingSlip", packingSlipSchema, 'PackingSlip');