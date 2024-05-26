const blogReducer = (state, action) => {
    switch (action.type){
        case "blogs/loadedBlogs" :{
            return [
                ...state,
                ...action.payload
            ];
        }
        case "blogs/addedBlog": {
            return[
                ...state,
                action.payload
            ];
        }
        case "blogs/deletedBLog": {
            return state.filter(blog => blog.id !== action.payload);
        }
        case "blogs/addedInfo": {
            return state.map(
                blog => {
                    if(blog.id === "tmp10082003"){
                        return {
                            ...blog,
                            ...action.payload
                        }
                    }
                    return blog
                }
            )
        }
        case "blogs/likedBlog": {
            return state.map(
                blog => {
                    if(blog.id === action.payload.blogId){
                        return {
                            ...blog,
                            likeCount: blog.likeCount + (action.payload.like ? 1 : -1)
                        }
                    }
                    return blog;
                }
            )
        }
        default: {
            return state;
        }
    }
}

export default blogReducer;