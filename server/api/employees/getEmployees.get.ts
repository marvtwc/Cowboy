import { Employee } from "~/server/models"


export default defineEventHandler(async (event) => {
    let employees = await Employee.find({})
    

    setResponseStatus(event,200);
    return employees;

})