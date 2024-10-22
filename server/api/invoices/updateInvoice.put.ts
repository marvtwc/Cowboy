
import { isValidObjectId } from "mongoose";
import {Invoice } from "~/server/models";


export default defineEventHandler(async(event) => {
    const requestBody = await readBody(event)
    //TODO:: Invoices shouldnt have customer id
    /* 
        {
            invoice_id: iid
            invoice: {
                vendor: vid,
                customer: cid
                invoice_content: <InvoiceContentsModel[]>{
                    product: <pRef>
                    quantity: Number
                }
            }
        }
    */
    if(!("invoice_id" in requestBody)){
        setResponseStatus(event,400,"invoice_id missing in request")
        return;
    }
    if(!("invoice" in requestBody)){
        setResponseStatus(event,400,"invoice missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.invoice_id) 
    || !(typeof(requestBody.invoice_id) =='string')){
        setResponseStatus(event,400,"Invoice ID probably invalid")
        return;
    }
    let vInvoice = isInvoice(requestBody.invoice);
    if(!vInvoice.valid || !vInvoice.model){
        setResponseStatus(event,400,"Invoice Invalid")
        return;
    }


    //find invoice, update invoice to new invoice_contents

    let foundInvoice = await Invoice.findOne({_id:requestBody.invoice_id})
    if(!foundInvoice){
        setResponseStatus(event,403,"Invoice not found")
        return;
    }

    foundInvoice.customer=vInvoice.model.customer;
    foundInvoice.vendor=vInvoice.model.vendor;
    foundInvoice.invoice_content = vInvoice.model.invoice_content
    foundInvoice.generating_quote= vInvoice.model.generating_quote;
    await foundInvoice.save();

    setResponseStatus(event,201);
    return {iid:foundInvoice._id}

})