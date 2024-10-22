import { isValidObjectId } from "mongoose";
import { Employee } from "~/server/models"


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

    let foundE = await Employee.findOne({_id:employeeId}).populate('customers')

    if(!foundE){
        setResponseStatus(event,403,"Employee not found");
        return;
    }

    setResponseStatus(event,200)
    return foundE.customers;
})