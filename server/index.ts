import mongoose from "mongoose"

const config = useRuntimeConfig();


export default async () => {
    try{
        await mongoose.connect(config.dbUri)
        console.log("Connected with state: "+mongoose.connection.readyState)
    }catch(err){
        console.error("DB connection failed",err);
    }
}