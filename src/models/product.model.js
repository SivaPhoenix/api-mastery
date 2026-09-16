const mongoose=require("mongoose");

const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            minlength:3,
            maxlength:200
        },
        description:{
            type:String,
            trim:true,
        },
        sku:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        price:{
            type:Number,
            required:true,
            min:0
        },
        currency:{
            type:String,
            required:true,
            default:"INR",
            uppercase:true
        },
        stock:{
            type:Number,
            required:true,
            min:0,
            default:0
        },
        category:{
            type:String,
            required:true,
            trim:true
        },
        status:{
            type:String,
            enum:["active","inactive"],
            default:"active"
        }
    },
    {timestamps:true}
)

const Product=mongoose.model("Product",productSchema)

module.exports=Product;
