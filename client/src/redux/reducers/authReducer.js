import jwtDecode from 'jwt-decode'
import { SIGN_IN, SIGN_UP, USER_LOADED, SIGN_OUT } from '../types'

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOADED:
		case SIGN_IN:
		case SIGN_UP:
			const user = jwtDecode(action.token)
			return {
				...state,
				token: action.token,
				id: user.id,
				nickname: user.nickname,
				name: user.name,
				email: user.email,
			}

		case SIGN_OUT:
			localStorage.removeItem('token')
			return {
				token: null,
				id: null,
				nickname: null,
				name: null,
				email: null,
			}

		default:
			return state
	}
}
