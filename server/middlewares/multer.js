import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'
import cloudinary from 'cloudinary' 

// cloudinary storage for multer    
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'stepprime', //folder in cloudinary
        allowed_formats:['jpeg','png','jpg']  //allowed file formats
    }
})


//multer middleware
const upload  = multer({storage})


export default upload;