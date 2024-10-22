import { isValidObjectId } from "mongoose";
import { Order, Quote } from "~/server/models";


export default defineEventHandler(async(event) => {
    const requestBody = await readBody(event)
    //TODO:: Quotes shouldnt have customer id
    /* 
        {
            order_id: oid,
            quote_id: qid
        }
    */
    if(!("order_id" in requestBody)){
        setResponseStatus(event,400,"order_id missing in request")
        return;
    }
    if(!("quote_id" in requestBody)){
        setResponseStatus(event,400,"quote_id missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.order_id) 
    || !(typeof(requestBody.order_id) =='string')){
        setResponseStatus(event,400,"Order ID probably invalid")
        return;
    }
    if(!isValidObjectId(requestBody.quote_id) 
    || !(typeof(requestBody.quote_id) =='string')){
        setResponseStatus(event,400,"Quote ID probably invalid")
        return;
    }


    //find order, create quote, add quote to order
    let foundOrder = await Order.findOne({_id:requestBody.order_id})
    if(!foundOrder){
        setResponseStatus(event,403,"Order not found")
        return;
    }

    await Order.updateOne({_id:requestBody.order_id}, {$pull:{quotes:requestBody.quote_id}})
    await Quote.deleteOne({_id:requestBody.quote_id})

    setResponseStatus(event,201)
    return {oid: foundOrder._id, qid:requestBody.quote_id}
    
})