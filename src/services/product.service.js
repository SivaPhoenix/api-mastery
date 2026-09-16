const productRepository=require("../repositories/product.repository");

const createProduct=async(productData)=>{
    const {sku}=productData.sku;
    const existingProduct=await productRepository.findBySku(sku);
    if(existingProduct){
        const error=new Error("Product with this SKU already exists");
        error.status=400;
        error.code="PRODUCT_SKU_ALREADY_EXISTS";
        throw error;
    }
    return productRepository.create(productData);
}

const createProducts=async(products)=>{
    if(!Array.isArray(products)||products.length===0){
        const error=new Error("Product Must be a non-empty array");
        error.status=400;
        error.code="INVALID_PRODUCTS";
        throw error;
    }
    return productRepository.createMany(products);
}

const getProducts=async()=>{
    return productRepository.findAll();
}

const getProductById=async(productId)=>{
    const product=await productRepository.findById(productId);
    if(!product){
        const error=new Error("Product not found");
        error.status=404;
        error.code="PRODUCT_NOT_FOUND";
        throw error;
    }
    return product;
}

const updateProduct=async(productId,productData)=>{
    const product=await productRepository.updateById(productId,productData);
    if(!product){
        const error=new Error("Product not found");
        error.status=404;
        error.code="PRODUCT_NOT_FOUND";
        throw error;
    }
    return product;
}

const deleteProduct=async(productId)=>{
    const product=await productRepository.deleteById(productId);
    if(!product){
        const error=new Error("Product not found");
        error.status=404;
        error.code="PRODUCT_NOT_FOUND";
        throw error;
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
