import Products from "../../models/productsSchema.js";

// to fetch all the products
const allProducts = async (req, res) => {
  try {
    const product = await Products.find();
    if (!product) {
      return res.status(203).json({ message: "no item in products" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// get the product by id 
const getProductById = async (req, res) => {
  try {
    const singleProduct = await Products.findById(req.params.id);
    if (!singleProduct) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json(singleProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// get the product by checking the category
const getProductCategory = async (req, res) => {
  try {
    const productCategory = await Products.find({ type: req.params.type });
    if (!productCategory) {
      return res.status(404).json({ message: "category not found" });
    }
    res.json(productCategory);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export { allProducts, getProductById, getProductCategory };
