import appconfig from '../appconfig.json';

const user = (state = {}, action) => {
    switch(action.type){
        case "USERLOGIN":
            return {...state , ...action.payload , islogin : true }
        case "USERLOGOUT":
            return {islogin : false}
        default: 
            return state
    }
}

const systemenv = (state = {apiurl : appconfig.apiurl , apiuserurl: appconfig.apiuserurl}, action) => {
    switch(action.type){
        case "SYSTEMCONFIGENV":
            return {...state , ...action.payload }
        default: 
            return state
    }
}

export {user , systemenv}