import { isValidObjectId } from "mongoose";
import { InvoiceContentsModel, QuoteContentsModel } from "./types";


interface validProduct {
    valid:boolean,
    model?:ProductModel
}

function isProduct(arg:any):validProduct{
    let response:validProduct = {valid:false}

    try{
        //check requireds
        response.valid = arg && "type" in arg && typeof(arg.type) == 'string';
        response.valid = response.valid && arg && "part_number" in arg && typeof(arg.part_number) == 'string';
        response.valid = response.valid && arg && "product_name" in arg && typeof(arg.product_name) == 'string';
        response.valid = response.valid && arg && "size" in arg && typeof(arg.size) == 'string';
        response.valid = response.valid && arg && "amount_per_case" in arg && typeof(arg.amount_per_case) == 'number';
        response.valid = response.valid && arg && "cost_per_product" in arg && typeof(arg.cost_per_product) == 'number';
        //add to return valid and typecasted model
        let currentModel: ProductModel = {
            type: arg.type,
            part_number: arg.part_number,
            product_name: arg.product_name,
            size: arg.size,
            amount_per_case: arg.amount_per_case,
            cost_per_product: arg.cost_per_product,
            vendor_owned:arg.vendor_owned
        }
        response = {valid:response.valid, model: currentModel};

        if(!isValidObjectId(arg.vendor_owned) && !(typeof(arg.vendor_owned) == 'string')){
            response.valid = false;
        }

        if("_id" in arg){
            currentModel._id=arg._id;
        }
        if("cases_per_pallet" in arg){
            if(typeof(arg.cases_per_pallet) =='number'){
                currentModel.cases_per_pallet = arg.cases_per_pallet;
            }else{
                response.valid=false;
            }
        }
        if("pallet_per_truck" in arg){
            if(typeof(arg.pallet_per_truck) =='number'){
                currentModel.pallet_per_truck = arg.pallet_per_truck;
            }else{
                response.valid=false;
            }
        }
        if("unit_measure" in arg){
            if(typeof(arg.unit_measure) =='string'){
                currentModel.unit_measure = arg.unit_measure;
            }else{
                response.valid=false;
            }
        }
        if("note" in arg){
            if(typeof(arg.note) =='string'){
                currentModel.note = arg.note;
            }else{
                response.valid=false;
            }
        }

    }catch{
        return response;
    }

    return response;
}

interface validContact {
    valid:boolean,
    model?:ContactModel
}

function isContact(arg:any):validContact{
    let response:validContact = {valid:false}
    try{
        //check requireds
        response.valid = arg && "name" in arg && typeof(arg.name) == 'string';
        response.valid = response && "phone_number" in arg && typeof(arg.phone_number) =='string'
        response.valid = response && "email" in arg && typeof(arg.email) =='string'
        //add to return valid and typecasted model
        let currentModel:ContactModel = {
            name: arg.name,
            phone_number: arg.phone_number,
            email: arg.email
        }
        response = {valid:response.valid, model: currentModel};
        if("title" in arg){
            if(typeof(arg.title) =='string'){
                currentModel.title = arg.title;
            }else{
                response.valid=false;
            }
        }
        if("note" in arg){
            if(typeof(arg.note) =='string'){
                currentModel.note = arg.note;
            }else{
                response.valid=false;
            }
        }

    }catch{
        return response;
    }

    return response;
}

interface validCustomer{
    valid: boolean,
    model?: CustomerModel
}

function isCustomer(arg:any):validCustomer{
    let response:validCustomer = {valid:false}
    try{
        //check requireds
        response.valid = arg && "name" in arg && typeof(arg.name) == 'string';
        response.valid = response.valid && "address" in arg && typeof(arg.address) == 'string';
        response.valid = response.valid && "city" in arg && typeof(arg.city) == 'string';
        response.valid = response.valid && "state" in arg && typeof(arg.state) == 'string';
        response.valid = response.valid && "zip" in arg && typeof(arg.zip) == 'string';
        response.valid = response.valid && "billing_address" in arg && typeof(arg.billing_address) =='string';
        response.valid = response.valid && "billing_city" in arg && typeof(arg.billing_city) =='string';
        response.valid = response.valid && "billing_state" in arg && typeof(arg.billing_state) == 'string';
        response.valid = response.valid && "billing_zip" in arg && typeof(arg.billing_zip) == 'string';
        response.valid = response.valid && "margin" in arg && typeof(arg.margin) == 'number'
        //add to return valid and typecastedmodel
        let currentModel:CustomerModel = {
            name: arg.name,
            address: arg.address,
            city: arg.city,
            state: arg.state,
            zip: arg.zip,
            billing_address: arg.billing_address,
            billing_city: arg.billing_city,
            billing_state: arg.billing_state,
            billing_zip: arg.billing_zip,
            margin: arg.margin
        }
        response = {valid:response.valid,model:currentModel}
        //check optionals
        if("note" in arg){
            if(typeof(arg.note) =='string'){
                currentModel.note = arg.note;
            }else{
                response.valid=false;
            }
        }

    }catch{
        return response;
    }

    return response;
}

interface validVendor{
    valid: boolean,
    model?: VendorModel
}

function isVendor(arg:any):validVendor{
    let response:validVendor = {valid:false}
    try{
        //check requireds
        response.valid = arg && "name" in arg && typeof(arg.name) == 'string';
        response.valid = response.valid && "address" in arg && typeof(arg.address) == 'string';
        response.valid = response.valid && "city" in arg && typeof(arg.city) == 'string';
        response.valid = response.valid && "state" in arg && typeof(arg.state) == 'string';
        response.valid = response.valid && "zip" in arg && typeof(arg.zip) == 'string';
        //add to return valid and typecastedmodel
        let currentModel:VendorModel = {
            name: arg.name,
            address: arg.address,
            city: arg.city,
            state: arg.state,
            zip: arg.zip,
        }
        response = {valid:response.valid,model:currentModel}
        //check optionals
        if("note" in arg){
            if(typeof(arg.note) =='string'){
                currentModel.note = arg.note;
            }else{
                response.valid=false;
            }
        }

    }catch{
        return response;
    }

    return response;
}

interface validQuoteContentsModel{
    valid: boolean,
    model?: QuoteContentsModel
}

function isQuoteContentsModel(arg:any):validQuoteContentsModel{
    let response: validQuoteContentsModel = {valid:false}

    try{
        response.valid = arg && "product" in arg;
        response.valid = response.valid && "quantity" in arg && typeof(arg.quantity) =='number'
        response.valid = response.valid && "margin" in arg && typeof(arg.margin) =='number'
        //valid product looks right in arg
        if(!isValidObjectId(arg.product) && !(typeof(arg.product) == 'string')){
            response.valid = false;
        }

        let validatedQuoteContentsModel:QuoteContentsModel = {
            product: arg.product,
            quantity: arg.number,
            margin: arg.margin
        }

        response= {
            valid: response.valid,
            model: validatedQuoteContentsModel
        }


    }catch{
        return response;
    }
    

    return response;
}

interface validQuoteModel{
    valid: boolean,
    model?: QuoteModel
}

function isQuote(arg:any):validQuoteModel{
    let response:validQuoteModel = {valid:false}
    try{
        //check if here
        response.valid = arg && "vendor" in arg;
        response.valid = response.valid && "customer" in arg
        response.valid = response.valid && "quote_content" in arg
        if(!response.valid){
            return response
        }
        //valid vendor looks right in arg
        if(!isValidObjectId(arg.vendor) && !(typeof(arg.vendor) == 'string')){
            response.valid = false;
        }
        //valid customer looks right in arg
        if(!isValidObjectId(arg.customer) && !(typeof(arg.customer) == 'string')){
            response.valid = false;
        }
        //check if all quote_contents_models are valid
        let x = (arg.quote_content as QuoteContentsModel[]).forEach( (quote_content)=>{
            response.valid = response.valid && isQuoteContentsModel(quote_content).valid;

        })
        let validatedModel:QuoteModel = {
            vendor: arg.vendor,
            customer:arg.customer,
            quote_content: arg.quote_content,
        }

        //either created or new quote, sometimes selling_order_po not generated yet
        if("selling_order_po" in arg){
            //this is a quote we already made before
            if(typeof(arg.selling_order_po) == 'string'){
                validatedModel.selling_order_po = arg.selling_order_po
            }
        }

        response.model=validatedModel;

    }catch{

    }

    return response;
}

interface validOrderModel{
    valid: boolean,
    model?: OrderModel
}

function isOrder(arg:any):validOrderModel{
    //whenever an order is created, we have no quotes/invoices so just check if customer looks right
    let response: validOrderModel = {valid:false}
    try{
        response.valid = arg && "customer" in arg;
        if(!response.valid){
            return response;
        }
        if(!isValidObjectId(arg.customer) && !(typeof(arg.customer) == 'string')){
            response.valid = false;
        }
        if(!isValidObjectId(arg.employee) && !(typeof(arg.employee) == 'string')){
            response.valid = false;
        }
        let validModel:OrderModel = {
            customer: arg.customer,
            employee: arg.employee,
            invoices: [],
            quotes: []
        }
        response.model=validModel;

    }catch{
        return response;
    }


    return response;
}

interface validInvoiceContentModel{
    valid:boolean,
    model?: InvoiceContentsModel
}

function isInvoiceContents(arg:any){
    let response: validInvoiceContentModel = {valid:false}
    try{
        response.valid = arg && "quantity" in arg && typeof(arg.quantity) == 'number'
        response.valid = response.valid && "margin" in arg && typeof(arg.margin) == 'number'
        console.log("good1"+" "+response.valid)
        if(!response.valid){
            return response;
        }
        let validModel:InvoiceContentsModel = {
            product:arg.product,
            quantity:arg.quantity,
            margin: arg.margin
        }
        if("product" in arg){
            let vProd = isProduct(arg.product);
            response.valid = response.valid && vProd.valid
        }else{
            response.valid=false;
        }
        console.log("good2"+" "+response.valid)

        
        response.model=validModel;

    }catch{
        return response;
    }


    return response;
}

interface validInvoiceModel{
    valid:boolean,
    model?: InvoiceModel
}

function isInvoice(arg:any){
    let response:validInvoiceModel = {valid:false}
    try{
        //check if here
        response.valid = arg && "vendor" in arg;
        response.valid = response.valid && "customer" in arg
        response.valid = response.valid && "invoice_content" in arg
        response.valid = response.valid && "generating_quote" in arg
        if(!response.valid){
            return response
        }
        //valid vendor looks right in arg
        if(!isValidObjectId(arg.vendor) && !(typeof(arg.vendor) == 'string')){
            response.valid = false;
        }
        //valid customer looks right in arg
        if(!isValidObjectId(arg.customer) && !(typeof(arg.customer) == 'string')){
            response.valid = false;
        }
        //valid generating_quote looks right in arg
        if(!isValidObjectId(arg.generating_quote) && !(typeof(arg.generating_quote) == 'string')){
            response.valid = false;
        }
        //check if all quote_contents_models are valid
        let x = (arg.invoice_content as any[]).forEach( (invoice_content)=>{
            response.valid = response.valid && isInvoiceContents(invoice_content).valid;

        })
        let validatedModel:InvoiceModel = {
            vendor: arg.vendor,
            customer:arg.customer,
            invoice_content: arg.invoice_content,
            generating_quote:arg.generating_quote
        }
        response.model=validatedModel;

    }catch{

    }

    return response;
}
interface validPackingSlipModel{
    valid:boolean,
    model?: PackingSlipModel
}
function isPackingSlip(arg:any){
    let response:validPackingSlipModel = {valid:false}
    try{
        //check if here
        response.valid = arg && "generating_invoice" in arg;
        response.valid = response.valid && "order_content" in arg
        if(!response.valid){
            return response
        }
        //valid generating_invoice looks right in arg
        if(!isValidObjectId(arg.generating_invoice) && !(typeof(arg.generating_invoice) == 'string')){
            response.valid = false;
        }

        //check if all quote_contents_models are valid
        let x = (arg.order_content as InvoiceContentsModel[]).forEach( (order_content)=>{
            response.valid = response.valid && isInvoiceContents(order_content).valid;

        })
        let validatedModel:PackingSlipModel = {
            generating_invoice: arg.generating_invoice,
            order_content: arg.order_content
        }
        response.model=validatedModel;

    }catch{

    }

    return response;
}


interface validVendorOrderModel{
    valid:boolean,
    model?: VendorOrderModel
}

function isVendorOrder(arg:any){
    let response:validVendorOrderModel = {valid:false}
    try{
        //check if here
        response.valid = arg && "buying_order_po" in arg && typeof(arg.buying_order_po) == 'string';
        response.valid = response.valid && "generating_invoice" in arg
        if(!response.valid){
            return response
        }
        //valid generating_invoice looks right in arg
        if(!isValidObjectId(arg.generating_invoice) && !(typeof(arg.generating_invoice) == 'string')){
            response.valid = false;
        }
        let validatedModel:VendorOrderModel = {
            generating_invoice: arg.generating_invoice,
            buying_order_po: arg.buying_order_po
        }
        response.model=validatedModel;

    }catch{

    }

    return response;
}



export { isProduct, isContact, isCustomer, isVendor, isQuote, isOrder, isVendorOrder, isPackingSlip, isInvoiceContents, isInvoice}