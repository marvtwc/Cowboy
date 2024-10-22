import mongoose, { isValidObjectId } from "mongoose";
import { Invoice } from "~/server/models";
import { InvoiceContentsModel } from "~/server/utils/types/types";


export default defineEventHandler(async (event) => {

    //receive a invoice id and return the invoice_contents_model array populated

    /*
    {
        invoice_contents: [
            {
                product: {
                    type: string;
                    part_number: string;
                    product_name: string;
                    size: string;
                    amount_per_case: number;
                    cases_per_pallet?: number;
                    cost_per_product: number;
                    pallet_per_truck?: number;
                    unit_measure?: string;
                    note?:string;
                }
                quantity: Number
            }
        ]
    }
    
    */

    let invoiceId = getQuery(event).invoice;

    if (!invoiceId) {
        setResponseStatus(event, 400, "Invoice missing in query");
        return;
    }

    if (!isValidObjectId(invoiceId) || !(typeof (invoiceId) == 'string')) {
        setResponseStatus(event, 400, "Invoice ID probably invalid");
        return;
    }

    let foundInvoice = await Invoice.findOne({ _id: invoiceId }).lean();

    if (!foundInvoice) {
        setResponseStatus(event, 403, "Invoice not found")
        return;
    }

    return { invoice_contents: foundInvoice.invoice_content }

})