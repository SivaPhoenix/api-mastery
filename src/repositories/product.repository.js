const Product=require("../models/product.model");

const create =async(productData)=>{
    return Product.create(productData);
}

const createMany=async(products)=>{
    return Product.insertMany(products);
}

const findById=async(productId)=>{
    return Product.findById(productId);
};

const findBySku=async(sku)=>{
    return Product.findOne({sku});
};

const findAll=async()=>{
    return Product.find().sort(
        {
            creatAt:-1,
            _id:-1
        }
    )
}

const updateById=async(productId,productData)=>{
    return Product.findByIdAndUpdate(
        productId,
        productData,
        {
            returnDocument: 'after',
            runValidators:true
        }
    )
}

const deleteById=async(productId)=>{
    return Product.findByIdAndDelete(productId)
}
module.exports={
    create,
    createMany,
    findById,
    findAll,
    updateById,
    deleteById,
    findBySku
}