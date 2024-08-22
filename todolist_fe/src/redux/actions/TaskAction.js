import { getListTask, createTaskApi, getTaskApi,getTaskDetailApi, editTaskApi } from "../../utils/api";
import { notification } from 'antd';

export const getTask = ()=>{
    return async(dispatch)=>{
        try {
            const data = await getListTask()
            dispatch({
                type:"GET_TASK",
                data:data
            })
            
        } catch (error) {
            console.log(error.message);
            console.log("error get task in catch");
        }
    }
}
export const getTaskByCondition = (objectSearch)=>{
    return async(dispatch)=>{
        try{
            const data = await getTaskApi(objectSearch)
            dispatch({
                type:"GET_TASK_BY_CONDITION",
                data:data
            })
        }catch(error){
            console.log(error.message);
            console.log("error get task by condition in catch");
        }
    }
}

export const createTask = (data)=>{
    return async(dispatch)=>{
        try {
            // console.log(data);
            const response = await createTaskApi(data)
            if(response.code==200){
                notification.success({
                    message:"Tạo công việc thành công"
                  })
                dispatch({
                    type:"CREATE_TASK",
                    data:response
                })
            }
            else{
                notification.error({
                    message:"Tạo công việc không thành công",
                    description: response.message
                })
            }
            
            
        } catch (error) {
            console.log(error.message);
            console.log("error create task in catch");
        }
    }
    
}
export const getTaskDetail= (id)=>{
    return async (dispatch)=>{
        try{
            const response = await getTaskDetailApi(id)
            if(response.code==200){
                dispatch({
                    type:"GET_TASK_DETAIL",
                    data:response.data
                })
            }
            else{
                notification.error({
                    message:"Lỗi đường dẫn",
                    description: response.message
                })
            }

        }catch(error){
            console.log(error.message);
            console.log("error get task detail in catch");
        }
    }
}
export const editTask = (id,data)=>{
    return async(dispatch)=>{
        try {
            const response = await editTaskApi(id,data);
            if(response.code==200){
                notification.success({
                    message:"Cập nhật thành công",
                    description: response.message
                })
                dispatch({
                    type:"EDIT_TASK"
                })
            }
            else{
                notification.open({
                    message:"Cập nhật không thành công",
                    description: response.message
                })
            }
        } catch (error) {
            console.log(error.message);
            console.log("error edit task in catch");
        }
    }
}