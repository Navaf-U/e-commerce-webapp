import {v2 as cloudinary} from "cloudinary"

const connectCloudinary = async ()=>{
    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_NAME,
        app_key : process.env.CLOUDINARY_API_KEY,
        secret_key :process.env.CLOUDINARY_SECRET_KEY
    })
}

export default connectCloudinary