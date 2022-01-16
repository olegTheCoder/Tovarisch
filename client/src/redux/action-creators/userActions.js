import { GET_ALL_USERS} from '../types'

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
