import React, {useState} from 'react'
import style from './style.module.css'
import {useDispatch} from 'react-redux'
import {signIn} from '../../../redux/actions/authActions'
import {useNavigate} from 'react-router-dom'


const SigninModal = ({activeIn, setActiveIn}) => {
    const navigate = useNavigate()
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
        navigate('/')
        setActiveIn(false)
    }

    return (
        <div className={activeIn ? `${style.modal} ${style.active}` : style.modal} onClick={() => setActiveIn(false)}>
            <div className={activeIn ? style.modal__content : style.modal} onClick={e => e.stopPropagation()}>
                <form id="lalala" onSubmit={handleSubmit} className="m-5">
                    {/*<label htmlFor="email" className="email">Email</label>*/}

                    <input type="email" onChange={(e) => setUser({...user, email: e.target.value})}
                           className="form-control mb-2"
                           id="exampleInputEmail"
                           value={user.email}
                           placeholder="Email"/>
                    {/*<label htmlFor="name" className="email">Name</label>*/}

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

export default SigninModal
