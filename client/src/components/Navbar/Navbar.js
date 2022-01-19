import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
          <div className="d-flex justify-content-center collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/mapAllIncidents"
                >
                  Показать все происшествия
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/mapSetPoint"
                >
                  Создать своё событие
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/mapSetCircle"
                >
                  Установить область отслеживания
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/mapCircle"
                >
                  Совпадения
                </Link>
              </li>

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
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
