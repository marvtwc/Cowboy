import { Vendor } from "~/server/models"
import { isVendor } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    let vVendor = isVendor(requestBody)

    if(vVendor.valid == false){
        setResponseStatus(event,400,"Bad Vendor Data")
    }else{
        let createdVendor = await Vendor.create(vVendor.model)
        setResponseStatus(event,201)
        return {vid:createdVendor._id};
    }

})

