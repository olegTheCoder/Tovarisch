import { GET_ALL_USERS, SIGN_UP } from '../types'

export const getAllUsers = () => async (dispatch) => {
	try {
		const response = await fetch('http://localhost:5000')
		const allUsers = await response.json()
		dispatch({
			type: GET_ALL_USERS,
			payload: { allUsers },
		})
	} catch (error) {
		console.log(error)
	}
}

export const registerUser = (formData) => async (dispatch) => {
	try {
		const response = await fetch('http://localhost:5000/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(formData),
		})

		const newUser = await response.json()

		dispatch({
			type: SIGN_UP,
			payload: { newUser },
		})
	} catch (error) {
		console.log(error)
	}
}
