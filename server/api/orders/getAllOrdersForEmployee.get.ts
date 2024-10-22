import { isValidObjectId } from "mongoose";
import { Order } from "~/server/models";


export default defineEventHandler(async (event) => {
    let employeeId = getQuery(event).employee;

    if(!employeeId){
        setResponseStatus(event,400,"Employee Id missing in Query")
        return;
    }

    if(!isValidObjectId(employeeId) || !(typeof(employeeId) == 'string')){
        setResponseStatus(event,400,"Employee Id probably invalid")
        return;
    }

    let foundOrders = await Order.find({employee:employeeId}).sort({_id:-1})

    setResponseStatus(event,200)
    return foundOrders
})