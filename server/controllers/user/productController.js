import Products from "../../models/productsSchema.js";

const allProducts = async (req, res) => {
  const product = await Products.find({ isDeleted: false });
  if (!product) {
    return res.status(204).json({ message: "no item in products" });
  }
  res.status(200).json({ data: product });
};

const getProductById = async (req, res) => {
  const singleProduct = await Products.findById(req.params.id);
  if (!singleProduct) {
    return res.status(401).json({ message: "product not found" });
  }
  res.json(singleProduct);
};

const getProductCategory = async (req, res) => {
  const productCategory = await Products.find({ type: req.params.type });
  if (!productCategory) {
    return res.status(404).json({ message: "category not found" });
  }
  res.json({ data: productCategory });
};

export { allProducts, getProductById, getProductCategory };
