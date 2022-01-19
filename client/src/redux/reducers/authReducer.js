import jwtDecode from 'jwt-decode'
import { SIGN_IN, SIGN_UP, USER_LOADED, SIGN_OUT } from '../types'

export const authReducer = (state = {}, action) => {
	const { type, payload } = action

	switch (type) {

		case USER_LOADED:
		case SIGN_IN:
		case SIGN_UP:
			const { accessToken } = payload
			const user = jwtDecode(accessToken)
			console.log(user);
			return {
				id: user.id,
				nickname: user.nickname,
				name: user.name,
				email: user.email,
				token: accessToken,
			}

		case SIGN_OUT:
			localStorage.removeItem('token')
			return {
				id: null,
				nickname: null,
				name: null,
				email: null,
				token: null,
			}

		default:
			return state
	}
}
