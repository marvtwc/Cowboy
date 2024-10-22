import { isValidObjectId } from "mongoose";
import { Vendor } from "~/server/models"
import { isVendor } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    if(!("vendor_id" in requestBody)){
        setResponseStatus(event,400,"vendor_id missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.vendor_id) || !(typeof(requestBody.vendor_id) =='string')){
        setResponseStatus(event,400,"Vendor ID probably invalid")
        return;
    }

    let vVendor = requestBody.vendor_id

    let foundVendor = await Vendor.deleteOne({_id:vVendor})
    if(foundVendor.deletedCount == 0){
        setResponseStatus(event,403,"Vendor ID not found")
    }else{
        setResponseStatus(event,200,"Vendor deleted")
        return {vid:vVendor}
    }


})