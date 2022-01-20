import { Link } from "react-router-dom";
import {useState} from 'react'
import style from './style.module.css'
import SigninModal from './SigninModal/SigninModal'


function Navbar() {

    const [modalActive, setModalActive] = useState(false)


    return (
        <div>
            <nav className={style.nav}>
                <div>

                <Link className={style.logo} to="/">
                    Товарищ
                </Link>
                </div>

                <div className={style.li}>
                    <Link className={style.link1} to="/mapAllIncidents">Показать все происшествия</Link>
                    <Link className={style.link1} to="/mapSetPoint">Создать своё событие</Link>
                    <Link className={style.link1} to="/mapSetCircle">Установить область отслеживания</Link>
                    <Link className={style.link1} to="/mapCircle">Совпадения</Link>


                    {/*<Link className={style.link1} to="/home">Home</Link>*/}
                    <Link className={style.link1} to="/map">Map</Link>
                    <Link className={style.link1} to="/pc">PersonAc</Link>



                    <button className={`${style.modalModal} ${style.link1}`}
                            onClick={() => setModalActive(true)}>signup
                    </button>


                    <SigninModal active={modalActive} setActive={setModalActive}/>
                </div>
            </nav>
        </div>
  );
}

export default Navbar;
