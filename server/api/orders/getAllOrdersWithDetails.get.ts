import { isValidObjectId } from "mongoose";
import { Order } from "~/server/models";

export default defineEventHandler(async (event) => {
  const { Quote } = await import("~/server/models/index");
  let employeeId = getQuery(event).employee;

  if (!employeeId) {
    setResponseStatus(event, 400, "Employee Id missing in Query");
    return;
  }

  if (!isValidObjectId(employeeId) || !(typeof employeeId == "string")) {
    setResponseStatus(event, 400, "Employee Id probably invalid");
    return;
  }

  // TODO: Dakota fix this
  let foundOrders = await Order.find({ employee: employeeId })
    .lean()
    .populate<{
      invoices: InvoiceModel[];
      quotes: QuoteModel[];
      customer: CustomerModel;
      employee: UserModel;
    }>([
      { path: "customer" },
      { path: "employee" },
      { path: "invoices" },
      {
        path: "quotes",
        populate: {
          path: "quote_content",
          populate: { path: "product" },
          options: { sort: { _id: -1 } },
        },
      },
    ])
    .sort({ _id: -1 });

  setResponseStatus(event, 200);
  return foundOrders;
});
