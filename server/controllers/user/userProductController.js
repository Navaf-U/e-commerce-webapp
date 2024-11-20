import Products from '../../models/productsSchema.js'
const allProducts = async (req,res)=>{

    const product = await Products.find()
    if(!product){
        return res.status(203).json({message:"no item in products"})
    }
    res.status(200).json(product)
}

const getProductById = async (req,res) =>{
    const singleProduct = await Products.findById(req.params.id)
    if(!singleProduct){
        return res.status(404).json({message:"product not found"})
    }
    res.json(singleProduct)

}

const getProductCategory = async (req,res) =>{
    const productCategory = await Products.find({type : req.params.type}) 
    if(!productCategory){
        return res.status(404).json({message:"category not found"})
    }
    res.json(productCategory)
}

export {allProducts,getProductById,getProductCategory}

