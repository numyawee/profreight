import loading from './loading'
import {user , systemenv} from './user'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    loading,
    user,
    systemenv,
})

export default rootReducer