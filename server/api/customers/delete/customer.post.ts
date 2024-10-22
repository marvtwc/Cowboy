import { isValidObjectId } from "mongoose";
import { Customer } from "~/server/models"
import { isCustomer } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    if(!("customer_id" in requestBody)){
        setResponseStatus(event,400,"customer_id missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.customer_id) || !(typeof(requestBody.customer_id) =='string')){
        setResponseStatus(event,400,"Customer ID probably invalid")
        return;
    }

    let vCustomer = requestBody.customer_id

    let foundCustomer = await Customer.deleteOne({_id:vCustomer})
    if(foundCustomer.deletedCount == 0){
        setResponseStatus(event,403,"Customer ID not found")
    }else{
        setResponseStatus(event,200,"Customer deleted")
        return {cuid:vCustomer}
    }


})
