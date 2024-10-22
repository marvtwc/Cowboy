import { Customer } from "~/server/models"
import { isCustomer } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    let vCustomer = isCustomer(requestBody)

    if(vCustomer.valid == false){
        setResponseStatus(event,400,"Bad Customer Data")
    }else{
        let createdCustomer = await Customer.create(vCustomer.model)
        setResponseStatus(event,201)
        return {cuid:createdCustomer._id};
    }

})


