import { useSelector } from 'react-redux'
import TEMPUser from '../components/TEMPUser'

function HomePage() {
	const users = useSelector((state) => state.users)

	return <ul>{users && users.map((el, i) => <TEMPUser {...el} index={i} />)}</ul>
}

export default HomePage
