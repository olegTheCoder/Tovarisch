import { SIGN_IN, SIGN_OUT, SIGN_UP, USER_LOADED } from '../types'
const { REACT_APP_API_URL, REACT_APP_API_PORT, REACT_APP_API_AUTH_ENDPOINT } = process.env

export const signUp = (formData) => async (dispatch) => {
	const response = await fetch(`${REACT_APP_API_URL}:${REACT_APP_API_PORT}/${REACT_APP_API_AUTH_ENDPOINT}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			credentials: 'include',
		},
		body: JSON.stringify(formData),
	})

	const accessToken = await response.json()
	localStorage.setItem('token', accessToken.accessToken)

	dispatch({
		type: SIGN_UP,
		payload: accessToken,
	})
}

export const signIn = (formData) => async (dispatch) => {
	const response = await fetch(`${REACT_APP_API_URL}:${REACT_APP_API_PORT}/${REACT_APP_API_AUTH_ENDPOINT}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			credentials: 'include',
		},
		body: JSON.stringify(formData),
	})

	const accessToken = await response.json()
	localStorage.setItem('token', accessToken.accessToken)

	dispatch({
		type: SIGN_IN,
		payload: accessToken,
	})
}

export const loadUser = () => (dispatch, getState) => {
	const accessToken = getState().auth.token
	if (accessToken) {
		dispatch({
			type: USER_LOADED,
			payload: { accessToken },
		})
	} else return null
}

export const signOut = () => (dispatch) => {
	dispatch({
		type: SIGN_OUT,
		payload: null
	})
}
