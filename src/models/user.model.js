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
},
  {
    timestamps: true
  }
)

const User=mongoose.model("User",userSchema)
module.exports=User;

    