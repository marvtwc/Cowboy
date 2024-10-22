import mongoose, { Schema } from "mongoose"
import { VendorOrderModel } from '../utils/types/types'
import { VendorOrder } from "."


let vendorOrderSchema=new mongoose.Schema<VendorOrderModel>(
{
      buying_order_po:{
        type:String,
        unique:true
      },
      generating_invoice:{
        type:Schema.Types.ObjectId,
        ref:'Invoice'
      }
})

vendorOrderSchema.pre('save', async function() {
    let vendorOrderCount = (await VendorOrder.countDocuments({})) +""
    for(let i = 8-vendorOrderCount.length; i>0;i--){
        vendorOrderCount= "0"+vendorOrderCount
    }
    this.buying_order_po = vendorOrderCount;
  })

export default mongoose.model("VendorOrder",vendorOrderSchema , 'VendorOrder');