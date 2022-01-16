import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
	users: userReducer,
	auth: authReducer,
})

export default rootReducer
