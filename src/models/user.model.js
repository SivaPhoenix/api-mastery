const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    passwordHash:{
        type:String,
        required:true,
        select:false
    },
    role:{  
        type:String,
        enum:["customer","admin"],
        default:"customer"
    },
    status:{
        type:String,
        enum:["active","blocked"],
        default:"active"
    },
    age:{
        type:Number,
        required:true,
        min:5,
        max:100
    },
    gender:{
        type:String,
        enum:["male","female","other"],
        required:true
    },
    city:{
        type:String,
        trim:true
    },
    country:{
        type:String,
        trim:true
    },
    phone:{
        type:String,
        trim:true
    }
},
  {
    timestamps: true
  }
)

const User=mongoose.model("User",userSchema)
module.exports=User;

    