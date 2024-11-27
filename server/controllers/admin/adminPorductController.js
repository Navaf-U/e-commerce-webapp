import Product from "../../models/productsSchema.js";
import CustomError from "../../utils/customError.js";
const createProducts = async (req, res, next) => {
  // will collect all data from req.body
  const newProduct = new Product(req.body);
  if (!newProduct) {
    return next(new CustomError("no products to create", 400));
  }
  await newProduct.save();
  res.status(200).json({ message: "Product created successfully" });
};

const updateProducts = async (req, res, next) => {
  const updatedProduct = await Product.findOneAndUpdate(
    {_id:req.params.id},
    { $set: req.body },
    { new: true }
  );
  if (!updatedProduct) return next(new CustomError("product not found", 404));

  res.status(200).json({ message: "Product updated successfully" });
};

// will toggle isDeleted based on its current value
const deleteProducts = async (req,res,next)=>{
    const product = await Product.findById(req.params.id);
    const deletedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {$set:{isDeleted: !product.isDeleted}},
        {new:true}
    )
    if(!deletedProduct)return next(new CustomError("Product not found",404));
    res.status(200).json({message: deletedProduct.isDeleted ? `Product is deleted successfully` : `Product is restored successfully` })
}




export { createProducts , updateProducts , deleteProducts};
