import axios from 'axios'
import { SIGN_IN, SIGN_OUT, SIGN_UP, USER_LOADED } from '../types'

export const signUp = (formData) => (dispatch) => {
	axios
		.post('http://localhost:5000/signup', formData)
		.then((token) => {
			localStorage.setItem('token', token.data)

			dispatch({
				type: SIGN_UP,
				token,
			})
		})
		.catch((error) => {
			console.log(error.response)
		})
}

export const loadUser = () => (dispatch, getState) => {
	const token = getState().auth.token
	if (token) {
		dispatch({
			type: USER_LOADED,
			token,
		})
	} else return null
}

export const signIn = (formData) => (dispatch) => {
	axios
		.post('http://localhost:5000/signin', formData)
		.then((token) => {
			localStorage.setItem('token', token.data)

			dispatch({
				type: SIGN_IN,
				token,
			})
		})
		.catch((error) => {
			console.log(error.response)
		})
}

export const signOut = () => (dispatch) => {
	dispatch({
		type: SIGN_OUT,
	})
}
