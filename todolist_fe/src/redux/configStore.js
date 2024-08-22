import {applyMiddleware, combineReducers,createStore} from "redux"
import { thunk } from "redux-thunk"
import UserReducer from "./reducers/UserReducer"
import TaskReducer from "./reducers/TaskReducer"

const rootReducer = combineReducers({
    UserReducer,
    TaskReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))
export default store