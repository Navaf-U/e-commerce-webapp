import WishList from "../../models/wishlistSchema.js"
import CustomError from "../../utils/customError.js"

// to get the logged user's wishList
const getUserWishList = async (req,res)=>{
    // populate with product
    const data = await WishList.findOne({userID:req.user.id}).populate("products")
    if(data){
        res.status(200).json(data)
    }else{
        // if no user ,will send an empty array
        res.status(200).json({products:[]})
    }
}

const addToWishList = async (req,res,next)=>{
    const {productID} = req.body;
    if(!productID){
        return next(new CustomError("product is required",400))
    }

    // update wishList
    let newWishList = await WishList.findOneAndUpdate(
        {userID:req.user.id},
        {$addToSet:{products:productID}},
        {new : true}       
) 
// if no wishList ,will create
if(!newWishList){
    newWishList = new WishList({
        userID: req.user.id,
        products:[productID ]
    })
    await newWishList.save()
    return res.status(200).json({message:"added to wishlist"})
}
res.status(200).json(newWishList)
}

// remove item from WishList
const removeFromWishList = async(req,res,next)=>{
    const {productID} = req.body;
    if(!productID){
        return next(new CustomError("product is required",400))
    }
    const removeWishList = await WishList.findOneAndUpdate(
        {userID : req.user.id},
        {$pull:{products:productID}},
        {new:true}
    )
    if(removeWishList){
        res.status(201).json({message:"removed from wishlist"})
    }else{
        next(new CustomError("product does not found in wishlist",404))
    }
}

export {getUserWishList,addToWishList,removeFromWishList}
