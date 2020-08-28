const loading = (state = {isshow : false , text : ''}, action) => {
    switch(action.type){
        case "SHOWLOADING":
            return {isshow : true , text : action.payload}
        case "HIDELOADING":
            return {isshow : false }
        default: 
            return state
    }
}

export default loading