import { isValidObjectId } from "mongoose";
import { Contact, Customer, Vendor } from "~/server/models";
import { isContact } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {

    const requestBody = await readBody(event);

    if(!("customer_id" in requestBody) && !("vendor_id" in requestBody)){
        setResponseStatus(event,400,"Customer ID or Vendor ID missing.")
        return;
    }
    if(!("contact" in requestBody)){
        setResponseStatus(event,400,"Contact missing from request")
        return;
    }


    let vContact = isContact(requestBody.contact)

    if(vContact.valid == false){
        setResponseStatus(event,400,"Bad Contact Data")
        return;
    }else{
        let createdContact = await Contact.create(vContact.model)

        if("customer_id" in requestBody){
            //error check customer id
            if(!isValidObjectId(requestBody.customer_id) || !(typeof(requestBody.customer_id) =='string')){
                setResponseStatus(event,400,"Customer ID probably invalid")
                return;
            }
            //add the contact to the right customer
            let foundCustomer = await Customer.findOne({_id:requestBody.customer_id})
            if(!foundCustomer){
                setResponseStatus(event,403,"Customer Not Found")
            }else{
                await Customer.updateOne({_id:requestBody.customer_id},{$push: {contacts: createdContact._id}})
            }
        }else if("vendor_id" in requestBody){
            //add the contact to the right vendor

            //error check customer id
            if(!isValidObjectId(requestBody.vendor_id) || !(typeof(requestBody.vendor_id) =='string')){
                setResponseStatus(event,400,"Vendor ID probably invalid")
                return;
            }
            //add the contact to the right customer
            let foundVendor = await Vendor.findOne({_id:requestBody.vendor_id})
            if(!foundVendor){
                setResponseStatus(event,403,"Vendor Not Found")
            }else{
                await Vendor.updateOne({_id:requestBody.vendor_id},{$push: {contacts: createdContact._id}})
            }
        }

        setResponseStatus(event,201)
        return {cid:createdContact._id};
    }

})

