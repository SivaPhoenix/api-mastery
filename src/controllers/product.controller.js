const mongoose = require("mongoose");
const productService = require("../services/product.service");
const ApiError = require("../utils/api-error");
const ERROR_CODES = require("../constants/error-codes");
const HTTP_STATUS = require("../constants/http-status");

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

const createProducts = async (req, res, next) => {
    try {
        const products = await productService.createProducts(req.body);
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getProducts();
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                ERROR_CODES.INVALID_PRODUCT_ID,
                "Invalid product ID"
            );
        }
        const product = await productService.getProductById(productId);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                ERROR_CODES.INVALID_PRODUCT_ID,
                "Invalid product ID"
            );
        }
        const product = await productService.updateProduct(productId, req.body);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                ERROR_CODES.INVALID_PRODUCT_ID,
                "Invalid product ID"
            );
        }
        const product = await productService.deleteProduct(productId);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Product Deleted Successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    createProducts,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
