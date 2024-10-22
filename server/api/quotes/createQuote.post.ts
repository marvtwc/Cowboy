import { isValidObjectId } from "mongoose";
import { Order, Quote } from "~/server/models";


export default defineEventHandler(async(event) => {
    const requestBody = await readBody(event)
    //TODO:: Quotes shouldnt have customer id
    /* 
        {
            order_id: oid,
            quote: {
                vendor: vid,
                customer: cid
                quote_content: <QuoteContentsModel[]>{
                    product: <pRef>
                    quantity: Number
                }
            }
        }
    */
    if(!("order_id" in requestBody)){
        setResponseStatus(event,400,"order_id missing in request")
        return;
    }
    if(!("quote" in requestBody)){
        setResponseStatus(event,400,"quote missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.order_id) 
    || !(typeof(requestBody.order_id) =='string')){
        setResponseStatus(event,400,"Order ID probably invalid")
        return;
    }
    let vQuote = isQuote(requestBody.quote);
    if(!vQuote.valid){
        setResponseStatus(event,400,"Quote Invalid")
        return;
    }


    //find order, create quote, add quote to order
    let foundOrder = await Order.findOne({_id:requestBody.order_id})
    if(!foundOrder){
        setResponseStatus(event,403,"Order not found")
        return;
    }
    
    let createdQuote = await Quote.create(vQuote.model)

    await Order.updateOne({_id:requestBody.order_id}, {$push:{quotes:createdQuote._id}})

    setResponseStatus(event,201)
    return {oid: foundOrder._id, qid:createdQuote._id}
    
})