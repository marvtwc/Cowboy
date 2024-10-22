import { Product } from "~/server/models"


export default defineEventHandler(async (event) => {
    let products = await Product.find({}).populate('vendor_owned','name')
    

    setResponseStatus(event,200);
    return products;

})