import { Link } from 'react-router-dom';
import mouse from '../img/header/mouse.svg';
import logo from '../img/logo.svg';
import App from '../App';
import { useState } from 'react';



function SmallHeader() {
  const [isMenu, setIsMenu] = useState(false);

  function menuClick(){
    setIsMenu(true);
  }

  function menuClose(e){
    if (e.target.id == "menu-modal") {
      setIsMenu(false);
    }
  }
    return (
        <div className="header__top">
          <div className="container">
            <div className="header__top-row">
              <a href="#">
                <img src={logo} alt="UtopiaEstates" />
              </a>
              <div className="header__nav">
                <nav className="nav">
                  <ul className="nav__list">
                    <li>
                      <Link to="/">О комплексе</Link>
                    </li>
                    <li>
                      <Link to="/catalog">Каталог квартир</Link>
                    </li>
                    <li>
                      <Link to="/ipoteka">Ипотека</Link>
                    </li>
                    <li>
                      <Link to="/contacts">Контакты</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="header__nav-btn" onClick={menuClick}>
                <button className="nav-icon-btn">
                  <div className="nav-icon" />
                </button>
              </div>
              {
                isMenu
              ?(<div onClick={menuClose} id="menu-modal" className='top-0 left-0 fixed w-[100vw] h-[100vh] bg-white/50 flex flex-col gap-5 justify-center items-center text-black z-20'>
                    <li>
                      <Link to="/catalog">Каталог квартир</Link>
                    </li>
                    <li>
                      <Link to="/ipoteka">Ипотека</Link>
                    </li>
                    <li>
                      <Link to="/contacts">Контакты</Link>
                    </li>
                    <li>
                      <Link to="/"> Главная</Link>
                    </li>
              </div>)
              : ''
              }
            </div>
          </div>
        </div>
    )
}

export default SmallHeader;