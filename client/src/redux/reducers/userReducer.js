import { GET_ALL_USERS, SIGN_UP } from '../types'

export const userReducer = (state = [], action) => {
	const { type, payload } = action

	switch (type) {
		case GET_ALL_USERS:
			const { allUsers } = payload
			return allUsers

		case SIGN_UP:
			const { newUser } = payload
			return [...state, newUser]

		default:
			return state
	}
}
