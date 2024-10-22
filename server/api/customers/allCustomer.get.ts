import { Customer } from "~/server/models";

export default defineEventHandler(async (event) => {
  let customers = await Customer.find({}).populate("contacts");

  setResponseStatus(event, 200);
  return customers;
});
