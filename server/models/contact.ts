import mongoose, { Schema } from "mongoose"


export default mongoose.model("Contact",new mongoose.Schema<ContactModel>({
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    note: String
}),'Contact')