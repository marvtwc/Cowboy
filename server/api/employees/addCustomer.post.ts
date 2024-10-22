import { isValidObjectId } from "mongoose";
import { Customer, Employee } from "~/server/models";



export default defineEventHandler(async (event) => {

    const requestBody = await readBody(event);

    if(!("employee_id" in requestBody)){
        setResponseStatus(event,400,"employee_id missing in request")
        return;
    }
    if(!("customer_id" in requestBody)){
        setResponseStatus(event,400,"customer_id missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.employee_id) 
    || !(typeof(requestBody.employee_id) =='string')){
        setResponseStatus(event,400,"Employee ID probably invalid")
        return;
    }

    if(!isValidObjectId(requestBody.customer_id) 
    || !(typeof(requestBody.customer_id) =='string')){
        setResponseStatus(event,400,"Customer ID probably invalid")
        return;
    }

    //check if customer/employee exists
    let foundEmployee = await Employee.findOne({_id:requestBody.employee_id})
    let foundCustomer = await Customer.findOne({_id:requestBody.customer_id})

    if(!foundEmployee){
        setResponseStatus(event,403,"Employee not found")
        return;
    }
    if(!foundCustomer){
        setResponseStatus(event,403,"Customer not found");
        return;
    }

    await Employee.updateOne({_id:foundEmployee._id},{$push: {customers: foundCustomer._id}})
    setResponseStatus(event,201)
    return {eid: foundEmployee._id,cid:foundCustomer._id}


})