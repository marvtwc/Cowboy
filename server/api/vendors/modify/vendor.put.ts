import { ObjectId, isValidObjectId } from "mongoose";
import { Vendor } from "~/server/models"
import { isVendor } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    if(!("vendor_id" in requestBody) || !("vendor" in requestBody)){
        setResponseStatus(event,400,"vendor_id or vendor missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.vendor_id) || !(typeof(requestBody.vendor_id) =='string')){
        setResponseStatus(event,400,"Vendor ID probably invalid")
        return;
    }
    let vendorToModify = requestBody.vendor_id

    let vVendor = isVendor(requestBody.vendor);

    if(vVendor.valid == false){
        setResponseStatus(event,400,"Bad Vendor Data")
    }else{
        let modifyVendor = await Vendor.findOne({_id:vendorToModify})
        if(vVendor.model != undefined && modifyVendor){
            modifyVendor.overwrite(vVendor.model);
            await modifyVendor.save();
            setResponseStatus(event,201)
            return {vid:modifyVendor._id}
        }
        else{
            setResponseStatus(event,403,"Vendor ID not found");
        }
    }

})
