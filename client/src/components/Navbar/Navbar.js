import {Link} from 'react-router-dom'
import {useState} from 'react'
import style from './style.module.css'
import SignupModal from './SignupModal/SignupModal'
import SigninModal from './SigninModal/SigninModal'


function Navbar() {

    const [modalActive, setModalActive] = useState(false)
    const [modalActiveIn, setModalActiveIn] = useState(false)
    const [linkActive, setLinkActive] = useState(false)
    const rootClasses = [style.common]


    const changeActive = () => {
        setLinkActive(true)
    }
    const changeStatus = () => {
        setLinkActive(false)
    }

    return (
        <div>
            <nav className={style.nav}>
                <div>

                    <Link className={style.logo} to="/">
                        Товарищ
                    </Link>
                </div>

                <div className={style.li}>
                    <div>
                        <button onMouseEnter={changeActive} className={style.mapBtn}>map</button>
                        <div onMouseLeave={changeStatus}
                            // className={`${style.common} ${style.active}`}>
                             className={linkActive ? `${style.common} ${style.active}` : style.none}>
                            {/*// absolute bottom 0 translate-y 100%*/}
                            <div>
                                <Link className={style.link2} to="/mapAllIncidents">Показать все происшествия</Link>
                            </div>
                            <div>
                                <Link className={style.link2} to="/mapSetPoint">Создать своё событие</Link>
                            </div>
                            <div>
                                <Link className={style.link2} to="/mapSetCircle">Установить область отслеживания</Link>
                            </div>
                            <div>
                                <Link className={style.link2} to="/mapCircle">Совпадения</Link>
                            </div>
                        </div>
                    </div>


                    <Link className={style.link1} to="/pc">signout</Link>


                    <button className={`${style.modalModal} ${style.link1}`}
                            onClick={() => setModalActive(true)}>signup
                    </button>
                    <SignupModal active={modalActive} setActive={setModalActive}/>


                    <button className={`${style.modalModal} ${style.link1}`}
                            onClick={() => setModalActiveIn(true)}>signin
                    </button>
                    <SigninModal activeIn={modalActiveIn} setActiveIn={setModalActiveIn}/>

                </div>
            </nav>
        </div>
    )
}

export default Navbar
