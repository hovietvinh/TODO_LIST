const User = require("../models/user.model")
const md5 = require("md5")
const {  generateRandomNumber, generateRandomString } = require("../../../helpers/generate")
const ForgotPassword = require("../models/forgot-password.model")
const { sendMail } = require("../../../helpers/sendMail")

//[GET] /api/v1/users/register
module.exports.register = async (req, res) => {
    try{
        const existEmail = await User.findOne({email:req.body.email})
        if(existEmail){
            return res.json({
                code:400,
                message:"Da ton tai email"
            })
        }
        else{
            req.body.token = generateRandomString(30)
            req.body.password = md5(req.body.password)
            const rs= await User.create(req.body)
            const data = await rs.save()
            return res.json({
                code:200,
                token:data.token,
            })
        }
        
    }catch(e){
        return res.json({
            code:400,
            message:"dang ki ko thanh cong"
        })
    }
}

//[Post] /api/v1/users/logout
module.exports.logout = async (req, res) => {
    
    try{
        res.clearCookie("token");
        return res.json({
            code:200,
            message:"dang xuat thanh cong"
        })
        
    }catch(e){
        return res.json({
            code:400,
            message:"dang xuat ko thanh cong"
        })
    }
}
//[POST] /api/v1/users/login
module.exports.login = async(req,res)=>{
    try{
       
        const {email,password} = req.body
        const existEmail = await User.findOne({email:email,deleted:false})
        if(!existEmail){
            res.json({
                code:400,
                message:"Email không tồn tại"
            })
        }else{
      
            if(md5(password)== existEmail.password){
                res.cookie("token",existEmail.token)
                res.json({
                    code:200,
                    message:"Đăng nhập thành công",
                    token:existEmail.token
                })
            }
            else{
                res.json({
                    code:400,
                    message:"Mật khẩu không chính xác"
                }) 
            }

        }
        
    }catch(e){
        res.json({
            code:400,
            message:"Đăng nhập không thành công"
        })
    }
}

//[POST] /api/v1/users/password/forgot
module.exports.forgotPassword = async(req,res)=>{
    try{
        const existUser = await User.findOne({email:req.body.email,deleted:false})
        if(existUser){
            const otp = generateRandomNumber(8)
            
            const time = 3
            const objectForgotPass = {
                email: req.body.email,
                otp:otp,
                expireAt : Date.now() +time*60*1000
            }

            const forgotPassword = new ForgotPassword(objectForgotPass)
            await forgotPassword.save()

            //gui otp qua email user
            const subject = "Mã OTP xác minh lấy lại mật khẩu"
            const html=`
                Mã OTP để lấy lại mật khẩu của bạn là <b>${otp}</b>.
                Vui lòng không chia sẻ mã OTP này với bất kì ai
            `
            sendMail(req.body.email,subject,html)
            

            res.json({
                code:200,
                message:"Đã gửi mã OTP thành công"
            })
        }else{
            res.json({
                code:400,
                message:"Email khong ton tai"
            })
        }
        
    }catch(e){
        res.json({
            code:400,
            message:"Khong the truy cap"
        })
    }
}

//[POST] /api/v1/users/password/rest
module.exports.resetPassword = async(req,res)=>{
   try {
        const {token,password} = req.body
        const user=  await User.findOne({token:token})
        
        if(md5(password)==user.password){
            res.json({
                code:400,
                message:"Vui long nhat mat khau moi khac voi mat khau cu"
            })
        }
        else{
            await User.updateOne({token:token},{password:md5(password)})
            res.json({
                code:200,
                message:"Thay doi mat khau thanh cong"
            })
        }
   } catch (error) {
    res.json({
        code:400,
        message:"reset password k thanh cong"
    })
   }
}

//[POST] /api/v1/users/password/otp
module.exports.otpPassword = async(req,res)=>{
    try {
        const {email,otp} = req.body
        const rs = await ForgotPassword.findOne({email:email,otp:otp})
        if(rs){
            const user = await User.findOne({email:email})
            res.cookie("token",user.token)
            res.json({
                code:200,
                message:"xac thuc thanh cong",
                token:user.token
            })
        }
        else{
            res.json({
                code:400,
                message:"OTP k chinh xac"
            })
        }
         
    } catch (error) {
        res.json({
            code:400,
            message:"OTP k chinh xac"
        })
    }
}
    
//[GET] /api/v1/users/detail
module.exports.detail = async(req,res)=>{
    try {
        console.log(req.user);
        res.json({
            code:200,
            message:"truy cap user thanh cong",
            data:req.user
          }) 
    } catch (error) {
      res.json({
        code:400,
        message:"truy cap user that bai"
      })  
    }
}

//[GET] /api/v1/users/list
module.exports.list = async(req,res)=>{
    try {
        const data = await User.find({deleted:false}).select("_id fullName email")
        res.json({
            code:200,
            message:"truy cap user thanh cong",
            data:data
          }) 
    } catch (error) {
      res.json({
        code:400,
        message:"truy cap user that bai"
      })  
    }
}