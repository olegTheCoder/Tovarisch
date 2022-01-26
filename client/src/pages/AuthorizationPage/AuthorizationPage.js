import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../redux/actions/authActions'

function AuthorizationPage() {
	// const auth = useSelector((state) => state.auth)
	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(signIn(user))

		setUser({
			email: '',
			password: '',
		})
	}

	return (
		<form onSubmit={handleSubmit} name='registration'>
			<p>
				<input
					onChange={(e) => setUser({ ...user, email: e.target.value })}
					value={user.email}
					type='email'
					name='email'
					placeholder='email'
				/>
			</p>
			<p>
				<input
					onChange={(e) => setUser({ ...user, password: e.target.value })}
					value={user.password}
					type='password'
					name='password'
					placeholder='password'
				/>
			</p>
			<p>
				<button onClick={handleSubmit} type='submit'>
					Отправить
				</button>
			</p>
		</form>
	)
}

export default AuthorizationPage
