import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import style from './style.module.css'
import {signUp} from '../../../redux/actions/authActions'
import {useNavigate} from 'react-router-dom'


const SignupModal = ({active, setActive}) => {
    const navigate = useNavigate()

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

        navigate('/')
        setActive(false)

    }

    return (
        <div className={active ? `${style.modal} ${style.active}` : style.modal} onClick={() => setActive(false)}>
            <div className={active ? style.modal__content : style.modal} onClick={e => e.stopPropagation()}>
                <form id="lalala" onSubmit={handleSubmit} className="m-5">
                    {/*<label htmlFor="email" className="email">Email</label>*/}
                    <input type="name" onChange={(e) => setUser({...user, nickname: e.target.value})}
                           className="form-control mb-2"
                           id="exampleInputNickname"
                           value={user.nickname}
                           placeholder="nickname"/>
                    <input type="email" onChange={(e) => setUser({...user, email: e.target.value})}
                           className="form-control mb-2"
                           id="exampleInputEmail"
                           value={user.email}
                           placeholder="Email"/>
                    {/*<label htmlFor="name" className="email">Name</label>*/}
                    <input type="name" onChange={(e) => setUser({...user, name: e.target.value})}
                           className="form-control mb-2"
                           id="exampleInputName"
                           value={user.name}
                           placeholder="Name"/>
                    {/*<label htmlFor="password" className="email">Password</label>*/}
                    <input type="password" onChange={(e) => setUser({...user, password: e.target.value})}
                           className="form-control mb-2"
                           id="exampleInputPassword"
                           value={user.password}
                           placeholder="password"/>
                    <button className={style.button} type="submit">отправить</button>
                </form>
            </div>
        </div>
    )
}

export default SignupModal