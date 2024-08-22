const mongoose = require("mongoose")
const generate = require("../../../helpers/generate");


const userchema = new mongoose.Schema(
    {
        fullName:String,
        email:String,
        password:String,
        token:{
            type:String
        },
        deleted: {
            type:Boolean,
            default:false
        },
        deletedAt: Date
    },{
        timestamps:true
    }
)

const User = mongoose.model("User",userchema,"users")
module.exports = User