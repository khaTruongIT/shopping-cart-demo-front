let initState = {
    categories: [],
};

const categoriesReducer=(state=initState, action)=>{
    const {type,payload}=action;

    switch(type){
        case 'FETCH_CATEGORIES':
            state.categories=payload;
            return {
                ...state
            }
        default: 
            return state;
    }
}

export default categoriesReducer;   