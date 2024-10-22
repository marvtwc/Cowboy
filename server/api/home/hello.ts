import { Employee } from "~/server/models"

export default defineEventHandler((event) => {
    setResponseStatus(event,200)
    return {
        hello: 'world'
    }
})