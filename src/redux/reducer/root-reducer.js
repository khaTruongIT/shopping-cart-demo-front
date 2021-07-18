import { combineReducers } from "redux";
import categoriesReducer from "./category";

const RootReducer = combineReducers({
    category: categoriesReducer
})

export default RootReducer;