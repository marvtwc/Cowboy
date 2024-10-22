import mongoose, { Schema } from "mongoose"
import { OrderModel } from '../utils/types/types'

export default mongoose.model("Order", new mongoose.Schema<OrderModel>(
  {
    quotes: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Quote'
      }]
    },
    invoices: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
      }]
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    },
    employee: {
      type:Schema.Types.ObjectId,
      ref: 'Employee'
    }
  }), 'Order');