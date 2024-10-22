import { ObjectId, isValidObjectId } from "mongoose";
import { Product } from "~/server/models";
import { isProduct } from "~/server/utils/types/type_guards";

export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  console.log(requestBody);

  if (!("product_id" in requestBody) || !("product" in requestBody)) {
    setResponseStatus(event, 400, "product_id or product missing in request");
    return;
  }

  if (
    !isValidObjectId(requestBody.product_id) ||
    !(typeof requestBody.product_id == "string")
  ) {
    setResponseStatus(event, 400, "Product ID probably invalid");
    return;
  }
  let productToModify = requestBody.product_id;

  let vProd = isProduct(requestBody.product);

  if (vProd.valid == false) {
    setResponseStatus(event, 400, "Bad Product Data");
  } else {
    let modifyProduct = await Product.findOne({ _id: productToModify });
    if (vProd.model != undefined && modifyProduct) {
      modifyProduct.overwrite(vProd.model);
      await modifyProduct.save();
      setResponseStatus(event, 201);
      return { pid: modifyProduct._id };
    } else {
      setResponseStatus(event, 403, "Product ID not found");
    }
  }
});
