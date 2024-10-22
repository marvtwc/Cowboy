import { isValidObjectId } from "mongoose";
import { Order, Invoice } from "~/server/models";


export default defineEventHandler(async(event) => {
    const requestBody = await readBody(event)
    //TODO:: Invoices shouldnt have customer id
    /* 
        {
            order_id: oid,
            invoice: {
                vendor: vid,
                customer: cid
                generating_quote: qid
                invoice_content: <InvoiceContentsModel[]>{
                    product: <pRef>
                    quantity: Number
                    margin: Number
                }
            }
        }
    */
    if(!("order_id" in requestBody)){
        setResponseStatus(event,400,"order_id missing in request")
        return;
    }
    if(!("invoice" in requestBody)){
        setResponseStatus(event,400,"invoice missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.order_id) 
    || !(typeof(requestBody.order_id) =='string')){
        setResponseStatus(event,400,"Order ID probably invalid")
        return;
    }
    let vInvoice = isInvoice(requestBody.invoice);
    if(!vInvoice.valid){
        setResponseStatus(event,400,"Invoice Invalid")
        return;
    }


    //find order, create invoice, add invoice to order
    let foundOrder = await Order.findOne({_id:requestBody.order_id})
    if(!foundOrder){
        setResponseStatus(event,403,"Order not found")
        return;
    }
    
    let createdInvoice = await Invoice.create(vInvoice.model)

    await Order.updateOne({_id:requestBody.order_id}, {$push:{invoices:createdInvoice._id}})

    setResponseStatus(event,201)
    return {oid: foundOrder._id, iid:createdInvoice._id}
    
})