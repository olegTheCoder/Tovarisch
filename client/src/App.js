import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import HomePage from './Pages/HomePage'
import PersonalCabinetPage from './Pages/PersonalCabinetPage'
import RegistrationPage from './Pages/RegistrationPage'
import AuthorizationPage from './Pages/AuthorizationPage'
import { useEffect } from 'react'
// import { getAllUsers } from './redux/action-creators/userActions'
// import { loadUser } from './redux/action-creators/authActions'

function App() {
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(loadUser())
	// }, [dispatch])

	return (
		<>
			<Header />
			<main className='main-container'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/personalcabinet' element={<PersonalCabinetPage />} />
					<Route path='/signin' element={<AuthorizationPage />} />
					<Route path='/signup' element={<RegistrationPage />} />
					<Route path='/signout' />
				</Routes>
			</main>
		</>
	)
}

export default App
