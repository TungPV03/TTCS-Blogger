import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; 
import blogReducer from "./blogslice";
import userReducer from "./userslice";
import commentsReducer from "./commentSlice";

const authReducer = (state, action) =>  {
    switch (action.type) {
        case "auth/setIsAuth":
            return action.payload;
    
        default:
            return state;
    }
}

const rootReducer = (state, action) => {
    return {
        blogs: blogReducer(state.blogs, action),
        comments: commentsReducer(state.comments, action),
        isAuth: authReducer(state.isAuth, action),
        user: userReducer(state.user, action)
    };
};

const initState = {
    isAuth: localStorage.getItem('isAuth'),
    user: {},
    comments: [],
    blogs: []
};

const store = createStore(rootReducer, initState, applyMiddleware(thunk)); 

export default store;
