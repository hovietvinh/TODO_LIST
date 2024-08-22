import { getListUser,getUserDetail,registerUser } from "../../utils/api"
import { notification } from 'antd';

export const getUser = (token)=>{
    return async (dispatch) =>{
        try {
            const data = await getUserDetail(token)
            if(data.code ==200){
                dispatch({
                    type:"GET_USER",
                    data:data.data
                })
            }
            else{
                console.log("error get user code 400");
                console.log(data);
            }
        } catch (error) {
            console.log(error.message);
            console.log("error get user in catch");
        }
    }
}
export const register = (data)=>{
    return async (dispatch)=>{
        try {
            
            const response = await registerUser(data)
            if(response.code ==200){
                notification.success({
                    message:"Đăng ký thành công"
                  })
                dispatch({
                    type:"REGISTER",
                    data:response.data
                })
            }
            else{
                notification.error({
                    message:"Đăng ký không thành công",
                    description: response.message
                })
            }

        } catch (error) {
            console.log(error.message);
            console.log("error register 2");
        }
    }
}