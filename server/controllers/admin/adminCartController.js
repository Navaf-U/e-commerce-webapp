import Cart from '../../models/cartSchema.js'
import CustomError from "../../utils/customError.js";

const getAllUserCarts = async (req,res) =>{
    const cartsData = await Cart.find();
    if(cartsData){
        res.status(200).json(cartsData);
    }else{
            next(new CustomError("No cart found",404));
    }
}

export {getAllUserCarts};

