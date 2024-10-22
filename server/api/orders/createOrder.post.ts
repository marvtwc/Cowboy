import { Order } from "~/server/models";
import { isOrder } from "~/server/utils/types/type_guards";



export default defineEventHandler(async(event) => {
    const requestBody = await readBody(event);

    let vOrder = isOrder(requestBody)

    if(!vOrder.valid){
        setResponseStatus(event,400,"Invalid Order")
        return;
    }

    let createdOrder = await Order.create(vOrder.model)

    return {oid: createdOrder._id}

})