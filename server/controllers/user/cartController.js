import Cart from '../../models/cartSchema.js'


// to get the userCart
const getUserCart = async (req,res)=>{
    const data = await Cart.findOne({userID:req.user.id}).populate({
        path:"products.productID",
        // to specify which fields to populate
        select: "name price image" 
    })

    if(data){
        res.status(200).json(data)
    }else{
        res.status(200).json({products:[]})
    }

}


const updateUserCart = async (req,res)=>{
    const {productID,quantity} = req.body;
    if(quantity<1){
        res.json({message:error.message})       
    }

    let cart = await Cart.findOne({UserID:req.user.id})
     // if user does not have cart,will create one
    if(!cart){
        cart = new Cart({
            userID:req.user.id,
            products:[{productID,quantity}]
        })
    }else{
        // checking if the products already in the cart
        const productIndex = cart.products.findIndex((prod)=>prod.productID.toString() === productID)

        if(productIndex > -1 ){
            // if the product already there update the quantity
            cart.products[productIndex].quantity = quantity
        }else{
            // if the prod not exists, will push
            cart.products.push({productID,quantity})
        }
    }

    const cartSaved = await cart.save()
    
    await cartSaved.populate({
        path:"products.productID",
        select:"name price image,"
    })
    re.status(200).json(cartSaved)
}


const removeFromCart = async (req,res) => {
    //finding the cart of the user with user id and remove the product
    const cart = await Cart.findOneAndUpdate(
        {userID:req.user.id , "products.productID":req.body.productID},
        {$pull:{products:{productID:req.body.productID}}},
        {new:true}
    )
    if(cart){
        await cart.populate({
            path:"products.productID",
            select:"name price image"
        })
        res.status(200).json(cart)
    }else{
        res.status(404).json({message:"Product not found in the cart"})
    }
}

export {getUserCart,updateUserCart,removeFromCart}