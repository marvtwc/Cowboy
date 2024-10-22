import { isValidObjectId } from "mongoose";
import { Customer, Employee, Product, Quote } from "~/server/models";
import Crypto from "node:crypto"
import fs from "fs"
import PizZip from "pizzip"
import templater from "docxtemplater"

export default defineEventHandler(async (event) => {

    const requestBody = await readBody(event);
    /*
        input: {
            customer_id: cid,
            employee_id: eid,
            quote_id: qid,
            products: [{
                product_id:pid,
                quantity: number
            }]
        }
    */

    /* 
        Have to generate, cost per product, net amount, subtotal and total_cost, quote_date
    */
    let formData: {customer_id: String,
    customer_name: String,
    customer_address: String,
    customer_city: String,
    customer_state: String,
    customer_zip:String,
    cbilling_address:String,
    cbilling_city:String,
    cbilling_state:String,
    cbilling_zip:String,
    employee_name:String,
    po_number:String,
    qdate:String,
    products: {product_pn:String,product_name:String,product_size:String,pquantity:String,amount_per_case:String,cost_per_product:String,net_amount:String}[],
    subtotal: String,
    total_cost:String} = {
        customer_id: "",
    customer_name: "",
    customer_address: "",
    customer_city: "",
    customer_state: "",
    customer_zip:"",
    cbilling_address:"",
    cbilling_city:"",
    cbilling_state:"",
    cbilling_zip:"",
    employee_name:"",
    po_number:"",
    qdate:"",
    products: [],
    subtotal: "",
    total_cost:""
    }

    let customer = await Customer.findOne({_id: requestBody.customer_id})
    if(!customer){
        setResponseStatus(event,401)
        return "Customer not Found"
    }
    //fill in customer stuff
    formData.customer_id = customer._id;
    formData.customer_name = customer.name;
    formData.customer_address = customer.address;
    formData.customer_city = customer.city;
    formData.customer_state = customer.state;
    formData.customer_zip = customer.zip;
    formData.cbilling_address = customer.billing_address;
    formData.cbilling_city = customer.billing_city;
    formData.cbilling_state = customer.billing_state;
    formData.cbilling_zip = customer.billing_zip;

    let employee = await Employee.findOne({_id: requestBody.employee_id})
    if(!employee){
        setResponseStatus(event,401)
        return "Employee not found"
    }
    //fill in employee stuff
    formData.employee_name = employee.name;

    let quote = await Quote.findOne({_id: requestBody.quote_id})
    if(!quote){
        setResponseStatus(event,401)
        return "Quote not found"
    }
    //fill in quote stuff
    formData.po_number = quote.selling_order_po!;
    //TODO:: Dakota add date to quote model, add function to do it am lazy for now then remove this
    let date: Date = new Date(Date.now())
    formData.qdate = date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear();

    let subtotal = 0.0;
    for await (const product of requestBody.products) {
        let thisP = await Product.findOne({_id:product.product_id})
        let pInfo = {product_pn:"", product_name:"",product_size:"",pquantity:"",amount_per_case:"",cost_per_product:"",net_amount:""}
        if(!thisP){
            setResponseStatus(event,401)
            return "Product not found"
        }
        pInfo.product_pn = thisP.part_number;
        pInfo.product_name = thisP.product_name;
        pInfo.product_size = thisP.size;
        pInfo.pquantity = product.quantity +"";
        pInfo.amount_per_case = thisP.amount_per_case +"";
        pInfo.cost_per_product = thisP.cost_per_product+"";
        pInfo.net_amount = (thisP.cost_per_product * product.quantity * thisP.amount_per_case) +""
        subtotal+=(thisP.cost_per_product * product.quantity * thisP.amount_per_case);
        console.log("pInfo: "+ JSON.stringify(pInfo))
        formData.products.push(pInfo)
        console.log(formData.products)
    }
    formData.subtotal = subtotal+"";
    formData.total_cost=subtotal+"";
    console.log(formData)


    //fill in template and return;

    /*let uniqueName = Crypto.createHash('sha1').update(JSON.stringify(formData)).digest('hex') + Date.now();
    const outputPath = 'server/private/outputs/' + uniqueName+'.docx'
    const template = fs.readFileSync('server/private/assets/template_quote.docx','binary');

    const zip = new PizZip(template)
    const doc = new templater(zip)

    doc.render(formData)

    const buf = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE'
    })
    fs.writeFileSync(outputPath,buf);
    setHeader(event,'Content-Type','application/xml; charset=utf-8');
    */
    setResponseStatus(event,201)
    return formData;

})
