import { applyMiddleware, createStore } from 'redux'
import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const initialState = {
	// users: [],
	auth: {
		token: localStorage.getItem('token'),
		id: null,
		nickname: null,
		name: null,
		email: null,
	},
}

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
