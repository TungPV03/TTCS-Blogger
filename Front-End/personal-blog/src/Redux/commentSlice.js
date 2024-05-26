const commentsReducer = (state,action) => {
    switch(action.type) {
        case "cmt/loadedCmts": {
            const newState = action.payload.filter(newCmt => !state.some(existingCmt => existingCmt.id === newCmt.id));
            return [
                ...state,
                ...newState
            ];
        }
        case "cmt/addedCmt": {
            return [
                ...state,
                action.payload
            ];
        }
        case "cmt/deletedCmt": {
            return state.filter(cmts => cmts.id !== action.payload);
        }
        case  "cmt/fetchId": {
            return state.map(
                cmt => {
                    if(cmt.id === 'tmpId'){
                        return {
                            ...cmt,
                            id: action.payload
                        };
                    }
                    return cmt;
                }
            )
        }
        default: {
            return state;
        }
    }
}

export default commentsReducer;