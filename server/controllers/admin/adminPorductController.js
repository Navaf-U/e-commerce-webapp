import Product from "../../models/productsSchema.js";
import CustomError from "../../utils/customError.js";
import { joiProductSchema } from "../../models/joiValSchema.js";
const createProducts = async (req, res, next) => {
  const { value, error } = joiProductSchema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  if (!req.file || !req.file.path) {
    return next(new CustomError("Image is required", 400));
  }
  const newProduct = new Product({
    ...value,
    image: req.file.path,
  });
  if (!newProduct) {
    return next(new CustomError("Product not created", 400));
  }
  await newProduct.save();
  res.status(201).json({
    message: "Product created successfully",
  });
};

const updateProducts = async (req, res, next) => {
  const newProduct = await Product.findById(req.params.id);
  if (!newProduct) return next(new CustomError("Product not found", 404));
  let image = newProduct.image;
  if (req.file) image = req.file.path;
  await newProduct.save();
  res.status(200).json({ message: "Product updated successfully" });
};

// will toggle isDeleted based on its current value
const deleteProducts = async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: { isDeleted: !isDeleted } },
    { new: true }
  );
  if (!deletedProduct) return next(new CustomError("Product not found", 404));
  res.status(200).json({
    message: deletedProduct.isDeleted
      ? `Product is deleted successfully`
      : `Product is restored successfully`,
  });
};

export { createProducts, updateProducts, deleteProducts };
