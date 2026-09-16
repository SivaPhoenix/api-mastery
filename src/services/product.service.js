const productRepository=require("../repositories/product.repository");
const ApiError = require("../utils/api-error");

const createProduct=async(productData)=>{
    const sku = productData.sku;
    const existingProduct=await productRepository.findBySku(sku);
    if(existingProduct){
        throw new ApiError(409, "PRODUCT_SKU_ALREADY_EXISTS", "Product with this SKU already exists");
    }
    return productRepository.create(productData);
}

const createProducts=async(products)=>{
    if(!Array.isArray(products)||products.length===0){
        throw new ApiError(400, "INVALID_PRODUCTS", "Products must be a non-empty array");
    }
    return productRepository.createMany(products);
}

const getProducts=async()=>{
    return productRepository.findAll();
}

const getProductById=async(productId)=>{
    const product=await productRepository.findById(productId);
    if(!product){
        throw new ApiError(404, "PRODUCT_NOT_FOUND", "Product not found");
    }
    return product;
}

const updateProduct=async(productId,productData)=>{
    const product=await productRepository.updateById(productId,productData);
    if(!product){
        throw new ApiError(404, "PRODUCT_NOT_FOUND", "Product not found");
    }
    return product;
}

const deleteProduct=async(productId)=>{
    const product=await productRepository.deleteById(productId);
    if(!product){
        throw new ApiError(404, "PRODUCT_NOT_FOUND", "Product not found");
    }
    return product;
}

module.exports={
    createProduct,
    createProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
