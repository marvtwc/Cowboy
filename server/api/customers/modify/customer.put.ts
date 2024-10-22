import { ObjectId, isValidObjectId } from "mongoose";
import { Customer } from "~/server/models"
import { isCustomer } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    if(!("customer_id" in requestBody) || !("customer" in requestBody)){
        setResponseStatus(event,400,"customer_id or customer missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.customer_id) || !(typeof(requestBody.customer_id) =='string')){
        setResponseStatus(event,400,"Customer ID probably invalid")
        return;
    }
    let customerToModify = requestBody.customer_id

    let vCustomer = isCustomer(requestBody.customer);

    if(vCustomer.valid == false){
        setResponseStatus(event,400,"Bad Customer Data")
    }else{
        let modifyCustomer = await Customer.findOne({_id:customerToModify})
        if(vCustomer.model != undefined && modifyCustomer){
            modifyCustomer.overwrite(vCustomer.model);
            await modifyCustomer.save();
            setResponseStatus(event,201)
            return {cuid:modifyCustomer._id}
        }
        else{
            setResponseStatus(event,403,"Customer ID not found");
        }
    }

})
