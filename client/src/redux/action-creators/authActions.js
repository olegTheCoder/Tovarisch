import { SIGN_IN, SIGN_OUT, SIGN_UP, USER_LOADED } from '../types'
const { REACT_APP_API_URL: API, REACT_APP_API_PORT: PORT, REACT_APP_API_AUTH_ENDPOINT: AUTH } = process.env

export const signUp = (formData) => async (dispatch) => {
	const response = await fetch(`${API}:${PORT}/${AUTH}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			credentials: 'include',
		},
		body: JSON.stringify(formData),
	})

	const accessToken = await response.json()

	localStorage.setItem('token', accessToken)

	dispatch({
		type: SIGN_UP,
		payload: accessToken,
	})
}

export const signIn = (formData) => async (dispatch) => {
	const response = await fetch(`${API}:${PORT}/${AUTH}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			credentials: 'include',
		},
		body: JSON.stringify(formData),
	})

	const accessToken = await response.json()

	localStorage.setItem('token', accessToken)

	dispatch({
		type: SIGN_IN,
		payload: accessToken,
	})
}

// export const loadUser = () => (dispatch, getState) => {
// 	const token = getState().auth.token
// 	if (token) {
// 		dispatch({
// 			type: USER_LOADED,
// 			token,
// 		})
// 	} else return null
// }

// export const signIn = (formData) => (dispatch) => {
// 	axios
// 		.post('http://localhost:5000/signin', formData)
// 		.then((token) => {
// 			localStorage.setItem('token', token.data)

// 			dispatch({
// 				type: SIGN_IN,
// 				token,
// 			})
// 		})
// 		.catch((error) => {
// 			console.log(error.response)
// 		})
// }

export const signOut = () => (dispatch) => {
	dispatch({
		type: SIGN_OUT,
	})
}
