const User  = require("../models/user.model")
module.exports.requireAuth = async(req,res,next)=>{
    if(req.headers.cookie){
        const token = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='));
        if(token){
            const actualToken = token.split("=")[1]
            
            const user = await User.findOne({token:actualToken,deleted:false}).select("-password")
            
            if(user){
                req.user = user
                next()
            }
            else{
                res.json({
                    code:400,
                    message:"token khong hop le",
                    token:token
                })
            }
        }
        
        
    }
    else{
        res.json({
            code:400,
            message:"Vui long gui kem token"
        })
    }
    
}