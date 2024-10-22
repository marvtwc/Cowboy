import { Employee } from "~/server/models";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.email || !body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "All fields are required",
    });
  }
  const userExists = await Employee.findOne({ email: body.email }).lean();

  if (userExists) {
    throw createError({
      statusCode: 409,
      statusMessage: "Conflict",
      message: "User already exists",
    });
  }

  const user = await Employee.create({
    email: body.email,
    username: body.username,
    password: body.password,
    name: body.name,
  });

  return { ...user, password: undefined };
});
