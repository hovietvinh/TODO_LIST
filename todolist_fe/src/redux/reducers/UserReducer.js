

const UserReducer = (state=[],action)=>{
  
    switch(action.type){
        case "GET_USER":
            state = [action.data]
            return [...state]
        case "REGISTER":
            return [...state,action.data]

    }
    return state
}

export default UserReducer