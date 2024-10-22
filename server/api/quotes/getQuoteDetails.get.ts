import mongoose, { isValidObjectId } from "mongoose";
import { Quote } from "~/server/models";
import { QuoteContentsModel } from "~/server/utils/types/types";


export default defineEventHandler(async (event) => {

    //receive a quote id and return the quote_contents_model array populated

    /*
    {
        quote_contents: [
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

    let quoteId = getQuery(event).quote;

    if (!quoteId) {
        setResponseStatus(event, 400, "Quote missing in query");
        return;
    }

    if (!isValidObjectId(quoteId) || !(typeof (quoteId) == 'string')) {
        setResponseStatus(event, 400, "Quote ID probably invalid");
        return;
    }

    let foundQuote = await Quote.findOne({ _id: quoteId }).populate<{
        quote_content: mongoose.Types.ArraySubdocument<QuoteContentsModel>
    }>({
        path: "quote_content",
        populate: { path: "product" },
        options: { sort: { _id: -1 } }
    })

    if (!foundQuote) {
        setResponseStatus(event, 403, "Quote not found")
        return;
    }

    return { quote_contents: foundQuote.quote_content }

})