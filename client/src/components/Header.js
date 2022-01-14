import { Link } from 'react-router-dom'
function Header() {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Главная</Link>
				</li>
				<li>
					<Link to='/personalcabinet'>Личный кабинет</Link>
				</li>
				<li>
					<Link to='/signin'>Авторизация</Link>
				</li>
				<li>
					<Link to='/signup'>Регистрация</Link>
				</li>
				<li>
					<Link to='/signout'>Выйти</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Header
