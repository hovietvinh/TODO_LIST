import axios from "./axios.customize"
import Cookies from 'js-cookie';
const loginApi = async(data)=>{
    const URL_LOGIN = `/api/v1/users/login`
   
    const response = await axios.post(URL_LOGIN,data)
    if (response?.data?.token) {
        Cookies.set('token', response.data.token, { expires: 7 }); // Save the token with an expiry of 7 days
    }
    return response
}   
const registerUser = async(data)=>{
    const URL_LOGIN = `/api/v1/users/register`
    const response = await axios.post(URL_LOGIN,data)
    return response
}
const getListUser = async()=>{
    const URL_LOGIN = `/api/v1/users/list`
  
    const response = await axios.get(URL_LOGIN)
    return response
}   
const getListTask = async()=>{
    const URL_LOGIN = `/api/v1/tasks`
  
    const response = await axios.get(URL_LOGIN)
    return response
}

const getUserDetail = async(token)=>{
    const URL_LOGIN ='/api/v1/users/detail'
    const response = await axios.get(URL_LOGIN, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response
}
const createTaskApi = async(data)=>{
    const URL_LOGIN ='/api/v1/tasks/create'
    const token = Cookies.get('token');
    try {
        const response = await axios.post(URL_LOGIN, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        });

        // Trả về dữ liệu phản hồi từ server
        return response;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
}
const getTaskApi = async(objectSearch)=>{
    
    
    let URL_LOGIN =`/api/v1/tasks?`
    if(objectSearch.keyword){
        URL_LOGIN+=`&keyword=${objectSearch.keyword}`
    }
    if(objectSearch.status){
        URL_LOGIN+=`&status=${objectSearch.status}`
    }
    
    const token = Cookies.get('token');
    try {
       
        const response = await axios.get(URL_LOGIN, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response
    } catch (error) {
        console.error('Error get task:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
}
const getTaskDetailApi = async(id)=>{
    let URL_LOGIN =`/api/v1/tasks/detail/${id}`
    try {
        const response = await axios.get(URL_LOGIN)
        return response
    } catch (error) {
        console.error('Error get detail task:', error);
        throw error;
    }
}

const editTaskApi = async(id,data)=>{
    let URL_LOGIN =`/api/v1/tasks/edit/${id}`
    try{
        const response = await axios.patch(URL_LOGIN,data)
        return response
    }catch(error){
        console.error('Error edit task:', error);
        throw error;
    }

}

export {
    loginApi,
    getListUser,
    getListTask,
    registerUser,
    getUserDetail,
    createTaskApi,
    getTaskApi,
    getTaskDetailApi,
    editTaskApi
}