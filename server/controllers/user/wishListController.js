import WishList from "../../models/wishlistSchema.js"
import CustomError from "../../utils/customError.js"

const getUserWishList = async (req, res) => {
    const data = await WishList.findOne({ userID: req.user.id }).populate("products")
    if (data) {
        res.status(200).json(data)
    } else {
        res.status(200).json({ products: [] })
    }
}

const addToWishList = async (req, res, next) => {
    const { productID } = req.body;
    if (!productID) {
        return next(new CustomError("product is required", 400))
    }

    let newWishList = await WishList.findOneAndUpdate(
        { userID: req.user.id },
        { $addToSet: { products: productID } },
        { new: true }
    )
    if (!newWishList) {
        newWishList = new WishList({
            userID: req.user.id,
            products: [productID]
        })
        await newWishList.save()
        return res.status(200).json({ message: "added to wishlist" })
    }
    res.status(200).json(newWishList)
}

const removeFromWishList = async (req, res, next) => {
    const { productID } = req.body;
    if (!productID) {
        return next(new CustomError("product is required", 400))
    }
    const removeWishList = await WishList.findOneAndUpdate(
        { userID: req.user.id },
        { $pull: { products: productID } },
        { new: true }
    )
    if (removeWishList) {
        res.status(201).json({ message: "removed from wishlist" })
    } else {
        next(new CustomError("product does not found in wishlist", 404))
    }
}

export { getUserWishList, addToWishList, removeFromWishList }
