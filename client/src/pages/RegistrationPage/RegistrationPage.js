import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../redux/actions/authActions'

function RegistrationPage() {
	const auth = useSelector((state) => state)
	console.log(auth)
	const [user, setUser] = useState({
		nickname: '',
		name: '',
		email: '',
		password: '',
	})

	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(signUp(user))

		setUser({
			nickname: '',
			name: '',
			email: '',
			password: '',
		})
	}

	return (
		<form onSubmit={handleSubmit} name='registration'>
			<p>
				<input
					onChange={(e) => setUser({ ...user, nickname: e.target.value })}
					value={user.nickname}
					type='text'
					name='nickname'
					placeholder='nickname'
				/>
			</p>
			<p>
				<input
					onChange={(e) => setUser({ ...user, name: e.target.value })}
					value={user.name}
					type='text'
					name='name'
					placeholder='name'
				/>
			</p>
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

export default RegistrationPage
