const productRepository = require("../repositories/product.repository");
const ApiError = require("../utils/api-error");
const ERROR_CODES = require("../constants/error-codes");
const HTTP_STATUS = require("../constants/http-status");

const createProduct = async (productData) => {
    const sku = productData.sku;
    const existingProduct = await productRepository.findBySku(sku);
    if (existingProduct) {
        throw new ApiError(
            HTTP_STATUS.CONFLICT,
            ERROR_CODES.PRODUCT_SKU_ALREADY_EXISTS,
            "Product with this SKU already exists"
        );
    }
    return productRepository.create(productData);
};

const createProducts = async (products) => {
    if (!Array.isArray(products) || products.length === 0) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            ERROR_CODES.INVALID_PRODUCTS,
            "Products must be a non-empty array"
        );
    }
    return productRepository.createMany(products);
};

const getProducts = async () => {
    return productRepository.findAll();
};

const getProductById = async (productId) => {
    const product = await productRepository.findById(productId);
    if (!product) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.PRODUCT_NOT_FOUND,
            "Product not found"
        );
    }
    return product;
};

const updateProduct = async (productId, productData) => {
    const product = await productRepository.updateById(productId, productData);
    if (!product) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.PRODUCT_NOT_FOUND,
            "Product not found"
        );
    }
    return product;
};

const deleteProduct = async (productId) => {
    const product = await productRepository.deleteById(productId);
    if (!product) {
        throw new ApiError(
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.PRODUCT_NOT_FOUND,
            "Product not found"
        );
    }
    return product;
};

module.exports={
    createProduct,
    createProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
