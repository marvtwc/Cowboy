import { isValidObjectId } from "mongoose";
import { Product } from "~/server/models"
import { isProduct } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    if(!("product_id" in requestBody)){
        setResponseStatus(event,400,"product_id missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.product_id) || !(typeof(requestBody.product_id) =='string')){
        setResponseStatus(event,400,"Product ID probably invalid")
        return;
    }

    let vProd = requestBody.product_id

    let foundProduct = await Product.deleteOne({_id:vProd})
    if(foundProduct.deletedCount == 0){
        setResponseStatus(event,403,"Product ID not found")
    }else{
        setResponseStatus(event,200,"Product deleted")
        return {pid:vProd}
    }


})
