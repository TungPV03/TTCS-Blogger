const userReducer = (state, action) => {
    switch (action.type){
        case "user/fetchUser": {
            return {
                ...state,
                ...action.payload
            }
        }
        case "user/updateUser": {
            return {
                ...state,
                ...action.payload
            }
        }
        case "user/addedLikedBlog": {
            if (!Array.isArray(state.likedBlog)) {
                return state; 
            }
            if(state.likedBlog.includes(action.payload)){
                return state;
            }
            return {
                ...state,
                likedBlog: [...state.likedBlog, action.payload]
            }
        }
        case "user/removerLikedBlog": {
            if (!Array.isArray(state.likedBlog)) {
                return state; 
            }
            return {
                ...state,
                likedBlog: state.likedBlog.filter(id => id !== action.payload)
            }
        }
        case 'user/clearUser': {
            return {}
        }
        default: {
            return state
        }
    }
}

export default userReducer;