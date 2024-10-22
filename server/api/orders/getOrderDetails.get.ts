import mongoose, { isValidObjectId } from "mongoose";
import { Order} from "~/server/models";


export default defineEventHandler(async (event) => {
    const {Quote} = await import('~/server/models/index')
    const {Invoice} = await import('~/server/models/index')
    let orderId = getQuery(event).order;


    if(!orderId){
        setResponseStatus(event,400,"Order Id missing in Query")
        return;
    }

    if(!isValidObjectId(orderId) || !(typeof(orderId) == 'string')){
        setResponseStatus(event,400,"Order Id probably invalid")
        return;
    }

    let foundOrder = await Order.findOne({_id:orderId}).sort({_id: 1}).populate<{
        quotes: mongoose.Types.ArraySubdocument<QuoteModel>,
        invoices: mongoose.Types.ArraySubdocument<InvoiceModel>
    }>(["quotes","invoices"])

    if(!foundOrder){
        setResponseStatus(event,403,"Order Not found")
        return;
    }

    if(!foundOrder.quotes || !foundOrder.invoices){
        setResponseStatus(event,403,"Should not happen")
        return;
    }

    setResponseStatus(event,200)
    return {quotes:foundOrder.quotes,invoices:foundOrder.invoices}
})