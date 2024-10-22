import { ObjectId, isValidObjectId } from "mongoose";
import { Contact } from "~/server/models"
import { isContact } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    if(!("contact_id" in requestBody) || !("contact" in requestBody)){
        setResponseStatus(event,400,"contact_id or contact missing in request")
        return;
    }

    if(!isValidObjectId(requestBody.contact_id) || !(typeof(requestBody.contact_id) =='string')){
        setResponseStatus(event,400,"Contact ID probably invalid")
        return;
    }
    let contactToModify = requestBody.contact_id

    let vContact = isContact(requestBody.contact);

    if(vContact.valid == false){
        setResponseStatus(event,400,"Bad Contact Data")
    }else{
        let modifyContact = await Contact.findOne({_id:contactToModify})
        if(vContact.model != undefined && modifyContact){
            modifyContact.overwrite(vContact.model);
            await modifyContact.save();
            setResponseStatus(event,201)
            return {cid:modifyContact._id}
        }
        else{
            setResponseStatus(event,403,"Contact ID not found");
        }
    }

})
