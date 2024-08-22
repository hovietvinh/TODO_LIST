const TaskReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_TASK":
            state = action.data
            // state = action.data
            return [...state]
        case "CREATE_TASK":
            return [...state,action.data.data]
        case "GET_TASK_BY_CONDITION":
            state = action.data
            return state
        case "GET_TASK_DETAIL":
            state = [action.data]
            return state
        case "EDIT_TASK":
            return state
    }
    return state
}

export default TaskReducer