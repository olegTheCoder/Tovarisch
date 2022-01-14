import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../redux/action-creators/userActions'

function RegistrationPage() {
	const [nickname, setNickname] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleNickname = (e) => {
		setNickname(e.target.value)
	}

	const handleName = (e) => {
		setName(e.target.value)
	}

	const handleEmail = (e) => {
		setEmail(e.target.value)
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = { nickname, name, email, password }
		dispatch(registerUser(formData))
		setNickname('')
		setName('')
		setEmail('')
		setPassword('')
	}

	return (
		<form onSubmit={handleSubmit} name='registration'>
			<p>
				<input onChange={handleNickname} value={nickname} name='nickname' placeholder='nickname' />
			</p>
			<p>
				<input onChange={handleName} value={name} name='name' placeholder='name' />
			</p>
			<p>
				<input onChange={handleEmail} value={email} type='email' name='email' placeholder='email' />
			</p>
			<p>
				<input onChange={handlePassword} value={password} type='password' name='password' placeholder='password' />
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
