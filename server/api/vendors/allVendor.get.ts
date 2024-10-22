import { Vendor } from "~/server/models"


export default defineEventHandler(async (event) => {
    let vendors = await Vendor.find({}).populate('contacts')
    

    setResponseStatus(event,200);
    return vendors;

})