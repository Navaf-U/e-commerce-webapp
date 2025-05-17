import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary';


const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'stepprime',
        allowed_formats:['jpeg','png','jpg'] 
    }
})

const upload  = multer({storage})


export default upload;