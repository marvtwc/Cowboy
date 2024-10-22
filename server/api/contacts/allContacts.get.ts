import { Contact } from "~/server/models"


export default defineEventHandler(async (event) => {
    let contacts = await Contact.find({})
    

    setResponseStatus(event,200);
    return contacts;

})