import { Product } from "~/server/models"
import { isProduct } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    let vProd = isProduct(requestBody)

    if(vProd.valid == false){
        setResponseStatus(event,400,"Bad Product Data")
    }else{
        let createdProduct = await Product.create(vProd.model)
        setResponseStatus(event,201)
        return {pid:createdProduct._id};
    }

})


