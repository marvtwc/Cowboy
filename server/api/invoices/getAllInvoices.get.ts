import mongoose, { isValidObjectId } from "mongoose";
import { Order } from "~/server/models/index";



export default defineEventHandler(async (event) => {
    const { Invoice } = await import('~/server/models/index')
    //optionally recieves an employee id or no employee id

    let employeeId;
    //getQuery(event).employee;

    if ("employee" in getQuery(event)) {
        employeeId = getQuery(event).employee;
    }

    if ("employee" in getQuery(event) && (!isValidObjectId(employeeId) || !(typeof (employeeId) == 'string'))) {
        setResponseStatus(event, 400, "Employee ID probably invalid");
        return;
    }

    let foundOrdersAndInvoices;
    if ("employee" in getQuery(event)) {
        foundOrdersAndInvoices = await Order.find({ employee: employeeId }).lean().populate<{
            invoices: InvoiceModel[]
        }>("invoices");
    }else{
        foundOrdersAndInvoices = await Order.find({}).lean().populate<{
            invoices: InvoiceModel[]
        }>("invoices");
    }

    let invoices:InvoiceModel[] = []

    foundOrdersAndInvoices.forEach((order) => {
        order.invoices.forEach((invoice) =>{
            invoices.push(invoice)
        })
    })

    setResponseStatus(event, 200)
    return invoices;
})