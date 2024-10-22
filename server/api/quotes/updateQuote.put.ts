
import { isValidObjectId } from "mongoose";
import {Quote } from "~/server/models";


export default defineEventHandler(async(event) => {
    const requestBody = await readBody(event)
    //TODO:: Quotes shouldnt have customer id
    /* 
        {
            quote_id: qid
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
    if(!("quote_id" in requestBody)){
        setResponseStatus(event,400,"quote_id missing in request")
        return;
    }
    if(!("quote" in requestBody)){
        setResponseStatus(event,400,"quote missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.quote_id) 
    || !(typeof(requestBody.quote_id) =='string')){
        setResponseStatus(event,400,"Quote ID probably invalid")
        return;
    }
    let vQuote = isQuote(requestBody.quote);
    if(!vQuote.valid || !vQuote.model){
        setResponseStatus(event,400,"Quote Invalid")
        return;
    }


    //find quote, update quote to new quote_contents

    let foundQuote = await Quote.findOne({_id:requestBody.quote_id})
    if(!foundQuote){
        setResponseStatus(event,403,"Quote not found")
        return;
    }

    foundQuote.customer=vQuote.model.customer;
    foundQuote.vendor=vQuote.model.vendor;
    foundQuote.quote_content = vQuote.model.quote_content
    await foundQuote.save();

    setResponseStatus(event,201);
    return {qid:foundQuote._id}

})