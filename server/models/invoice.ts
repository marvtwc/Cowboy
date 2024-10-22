import mongoose, { Schema, Types } from "mongoose"
import { InvoiceContentsModel, InvoiceModel } from '../utils/types/types' 


//TODO:: Invoice shouldnt use refs for anything.
export default mongoose.model("Invoice", new mongoose.Schema<InvoiceModel>(
 {
      vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor'
      },
      customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
      },
      invoice_content: {
        type: [
          {
            product: {
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
            },
            quantity:{
              type: Number
            },
            margin:Number
          }
        ]
      },
      generating_quote: {
        type: Schema.Types.ObjectId,
        ref: 'Quote'
      }
    }
), 'Invoice');