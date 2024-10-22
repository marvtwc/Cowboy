import { isValidObjectId } from "mongoose";
import { Contact } from "~/server/models"
import { isContact } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    if(!("contact_id" in requestBody)){
        setResponseStatus(event,400,"contact_id missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.contact_id) || !(typeof(requestBody.contact_id) =='string')){
        setResponseStatus(event,400,"Contact ID probably invalid")
        return;
    }

    let vContact = requestBody.contact_id

    let foundContact = await Contact.deleteOne({_id:vContact})
    if(foundContact.deletedCount == 0){
        setResponseStatus(event,403,"Contact ID not found")
    }else{
        setResponseStatus(event,200,"Contact deleted")
        return {cid:vContact}
    }


})
